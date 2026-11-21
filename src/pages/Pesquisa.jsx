import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import axios from '../api'
import Header from '../components/Header'
import OpenSource from '../components/OpenSource'
import Loading from '../components/Loading'
import ReactPaginate from '../components/Paginate'
import { DataAll } from '../components/Dados/DataAll'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

const Resultados = ({q}) => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
        let activo = true; // ignora respostas de pedidos antigos
        axios.get('/search/movie', {params: {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma, query: q, include_adult: false, page}})
            .then((r) => activo && setData(r.data))
            .catch(() => activo && setData({results: [], total_pages: 0, total_results: 0}));
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
                        <h2 className="_p">Resultados para “{q}”</h2>
                    </div>
                </div>
            </div>
            <div className="todos-actores">
                <div className="titulo">
                    <p>{data.total_results ? `${data.total_results} filmes` : 'Nenhum filme encontrado'}</p>
                </div>
                <div className="filmeR simil">
                    {data.results.map((item) => <DataAll key={item.id} item={item} type="filme"/>)}
                </div>
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
