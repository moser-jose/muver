import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import axios from '../api'
import Header from '../components/Header'
import OpenSource from '../components/OpenSource'
import Loading from '../components/Loading'
import ReactPaginate from '../components/Paginate'
import { DataAll } from '../components/Dados/DataAll'
import Actor from '../components/Actor'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

const Resultados = ({q}) => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [pessoas, setPessoas] = useState([]);
    const [series, setSeries] = useState(null); // null = ainda a carregar
    useEffect(() => {
        let activo = true; // ignora respostas de pedidos antigos
        const params = {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma, query: q, include_adult: false};
        axios.get('/search/movie', {params: {...params, page}})
            .then(async (r) => {
                if (!activo) return;
                setData(r.data);
                if (page !== 1) return;
                // actores: quem tem o nome pesquisado + o elenco do filme mais relevante
                const topo = r.data.results[0];
                const [nomes, tv, creditos] = await Promise.all([
                    axios.get('/search/person', {params}),
                    axios.get('/search/tv', {params}),
                    topo ? axios.get(`/movie/${topo.id}/credits`, {params: {api_key: params.api_key, language: idioma}}) : {data: {cast: []}},
                ]);
                const vistos = new Set();
                const lista = [...nomes.data.results, ...creditos.data.cast]
                    .filter((a) => !vistos.has(a.id) && vistos.add(a.id))
                    .sort((a, b) => b.popularity - a.popularity); // os mais conhecidos primeiro
                if (!activo) return;
                setPessoas(lista.slice(0, 9));
                setSeries(tv.data);
            })
            .catch(() => {
                if (!activo) return;
                setData((d) => d || {results: [], total_pages: 0, total_results: 0});
                setSeries((v) => v || {results: [], total_results: 0});
            });
        return () => { activo = false };
    }, [q, page])

    if (!data) return <Loading/>
    const fundo = data.results.find((f) => f.backdrop_path);
    return (
        <div className='simi-detalhe'>
            <OpenSource/>
            <Header/>
            <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.5),rgba(24, 24, 24, 0.5))${fundo ? `,url(https://image.tmdb.org/t/p/w1280${fundo.backdrop_path})` : ',#17171a'}`}}>
                <div className="pr">
                    <div className="data">
                        <h2 className="_p">{t('ui.resultados_para')} “{q}”</h2>
                    </div>
                </div>
            </div>
            <div className="todos-actores">
                {pessoas.length > 0 && <Actor act={true} data={pessoas} titulo={t('ui.pessoas')} type="actores"/>}
                {data.total_results > 0 && <>
                    <div className="titulo" style={{marginTop:'30px'}}>
                        <p>{data.total_results} {t('ui.n_filmes')}</p>
                    </div>
                    <div className="filmeR simil">
                        {data.results.map((item) => <DataAll key={item.id} item={item} type="filme"/>)}
                    </div>
                </>}
                {data.total_pages > 1 &&
                    <ReactPaginate
                        previousLabel={<ArrowLeft2 size="18" color="#fff" variant="Outline"/>}
                        nextLabel={<ArrowRight2 size="18" color="#fff" variant="Outline"/>}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.min(data.total_pages, 500)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(e) => { setPage(e.selected + 1); window.scrollTo({top: 0}); }}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                }
                {series?.total_results > 0 && <>
                    <div className="titulo" style={{marginTop:'40px'}}>
                        <p>{series.total_results} {t('ui.n_series')}</p>
                    </div>
                    <div className="filmeR simil">
                        {series.results.map((item) => <DataAll key={item.id} item={item} type="tv"/>)}
                    </div>
                </>}
                {series && !data.total_results && !series.total_results && !pessoas.length &&
                    <div className="titulo"><p>{t('ui.nenhum')}</p></div>
                }
            </div>
        </div>
    )
}

// a key reinicia a página e os resultados quando o termo muda
const Pesquisa = () => {
    const {q} = useParams();
    return <Resultados key={q} q={q}/>
}

export default Pesquisa
