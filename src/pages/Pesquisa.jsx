import Seo from '../components/Seo'
import { t } from '../translate/i18n'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import axios from '../api'
import slugify from 'slugify'
import Header from '../components/Header'
import OpenSource from '../components/OpenSource'
import Loading from '../components/Loading'
import ReactPaginate from '../components/Paginate'
import { DataAll } from '../components/Dados/DataAll'
import Actor from '../components/Actor'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);
const api_key = import.meta.env.REACT_APP_API_KEY;
const VAZIO = {results: [], total_pages: 0, total_results: 0};

const Paginacao = ({total, onChange}) => total > 1 &&
    <ReactPaginate
        previousLabel={<ArrowLeft2 size="18" color="#fff" variant="Outline"/>}
        nextLabel={<ArrowRight2 size="18" color="#fff" variant="Outline"/>}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.min(total, 500)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(e) => onChange(e.selected + 1)}
        containerClassName={"pagination"}
        activeClassName={"active"}
    />

const Resultados = ({q}) => {
    const params = {api_key, language: idioma, query: q, include_adult: false};
    const [filmes, setFilmes] = useState(null);
    const [series, setSeries] = useState(null);
    const [pessoas, setPessoas] = useState(null);
    const [extras, setExtras] = useState([]);
    const [pagFilmes, setPagFilmes] = useState(1);
    const [pagSeries, setPagSeries] = useState(1);
    const topoFilmes = useRef(null);
    const topoSeries = useRef(null);

    // cada lista tem a sua paginação; `activo` ignora respostas de pedidos antigos
    useEffect(() => {
        let activo = true;
        axios.get('/search/movie', {params: {...params, page: pagFilmes}})
            .then((r) => activo && setFilmes(r.data))
            .catch(() => activo && setFilmes((v) => v || VAZIO));
        return () => { activo = false };
    }, [pagFilmes])
    useEffect(() => {
        let activo = true;
        axios.get('/search/tv', {params: {...params, page: pagSeries}})
            .then((r) => activo && setSeries(r.data))
            .catch(() => activo && setSeries((v) => v || VAZIO));
        return () => { activo = false };
    }, [pagSeries])

    // actores: elenco principal dos filmes e séries mais relevantes para o título pesquisado
    useEffect(() => {
        let activo = true;
        const TITULOS = 5, POR_TITULO = 6; // shortcut: só os 5 primeiros filmes e séries (10 pedidos de elenco); aumentar se for preciso mais cobertura
        Promise.all([axios.get('/search/movie', {params}), axios.get('/search/tv', {params})])
            .then(([f, s]) => Promise.all([
                ...f.data.results.slice(0, TITULOS).map((x) => axios.get(`/movie/${x.id}/credits`, {params: {api_key, language: idioma}})),
                ...s.data.results.slice(0, TITULOS).map((x) => axios.get(`/tv/${x.id}/aggregate_credits`, {params: {api_key, language: idioma}})),
            ]))
            .then((elencos) => {
                const vistos = new Set();
                const lista = elencos.flatMap((r) => r.data.cast.slice(0, POR_TITULO))
                    .filter((a) => !vistos.has(a.id) && vistos.add(a.id))
                    .sort((a, b) => b.popularity - a.popularity); // os mais conhecidos primeiro
                if (activo) setPessoas(lista.slice(0, 9));
            })
            .catch(() => activo && setPessoas([]));
        return () => { activo = false };
    }, [])

    // colecções, produtoras e palavras-chave com o termo pesquisado
    useEffect(() => {
        let activo = true;
        const grupos = [['collection', 'coleccao', 'coleccoes'], ['company', 'produtora', 'produtoras'], ['keyword', 'keywords', 'palavras_chave']];
        Promise.all(grupos.map(([api]) => axios.get(`/search/${api}`, {params})))
            .then((r) => activo && setExtras(grupos.map(([, rota, rotulo], i) => ({rota, rotulo, itens: r[i].data.results.slice(0, 8)})).filter((g) => g.itens.length)))
            .catch(() => {});
        return () => { activo = false };
    }, [])

    if (!filmes || !series) return <Loading/>
    const fundo = [...filmes.results, ...series.results].find((f) => f.backdrop_path);
    const mudar = (setPagina, topo) => (pagina) => {
        setPagina(pagina);
        topo.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    return (
        <div className='simi-detalhe'>
            <OpenSource/>
            <Header/>
            <Seo titulo={`${t('ui.resultados_para')} “${q}”`} indexar={false}/>
            <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.5),rgba(24, 24, 24, 0.5))${fundo ? `,url(https://image.tmdb.org/t/p/w1280${fundo.backdrop_path})` : ',#17171a'}`}}>
                <div className="pr">
                    <div className="data">
                        <h2 className="_p">{t('ui.resultados_para')} “{q}”</h2>
                    </div>
                </div>
            </div>
            <div className="todos-actores">
                {pessoas?.length > 0 && <Actor act={true} data={pessoas} titulo={t('ui.pessoas')} type="actores"/>}
                {filmes.total_results > 0 && <>
                    <div className="titulo" ref={topoFilmes} style={{marginTop:'30px', scrollMarginTop:'20px'}}>
                        <p>{filmes.total_results} {t('ui.n_filmes')}</p>
                    </div>
                    <div className="filmeR simil">
                        {filmes.results.map((item) => <DataAll key={item.id} item={item} type="filme"/>)}
                    </div>
                    <Paginacao total={filmes.total_pages} onChange={mudar(setPagFilmes, topoFilmes)}/>
                </>}
                {series.total_results > 0 && <>
                    <div className="titulo" ref={topoSeries} style={{marginTop:'40px', scrollMarginTop:'20px'}}>
                        <p>{series.total_results} {t('ui.n_series')}</p>
                    </div>
                    <div className="filmeR simil">
                        {series.results.map((item) => <DataAll key={item.id} item={item} type="tv"/>)}
                    </div>
                    <Paginacao total={series.total_pages} onChange={mudar(setPagSeries, topoSeries)}/>
                </>}
                {extras.map((g) => (
                    <div className="chips" key={g.rota}>
                        <p>{t('ui.'+g.rotulo)}</p>
                        {g.itens.map((x) => <a key={x.id} href={`/${g.rota}/${slugify(x.name,{lower:true,strict: true}) || 'x'}/${x.id}`}>{x.name}</a>)}
                    </div>
                ))}
                {!filmes.total_results && !series.total_results && !extras.length &&
                    <div className="titulo"><p>{t('ui.nenhum')}</p></div>
                }
            </div>
        </div>
    )
}

// a key reinicia páginas e resultados quando o termo muda
const Pesquisa = () => {
    const {q} = useParams();
    return <Resultados key={q} q={q}/>
}

export default Pesquisa
