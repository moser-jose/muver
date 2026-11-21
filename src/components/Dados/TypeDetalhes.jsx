import Seo from '../Seo'
import { t } from '../../translate/i18n'
import { ArrowLeft2, ArrowRight2, Play, Star } from 'iconsax-react';
import React,{useState,useEffect} from 'react'
import ReactPaginate from '../Paginate';
import { useParams } from 'react-router-dom';
import {getIdioma} from '../../functions'
import axios from '../../api'
import Header from '../Header'
import OpenSource from '../OpenSource'
import { useApiContext } from '../../contexts/ApiContext';
import { DataAll } from './DataAll'
import Loading from '../Loading'
const idioma= localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);
const TypeDetalhes = ({media="movie"}) => {
    const tv = media==="tv";
    const {filmesdiscover}=useApiContext();
    const params = useParams();
    const [filme, setFilme]=useState([]);
    const [data, setData]=useState([]);
    const [loading, setLoading]=useState(false);
    const [page, setPage]=useState(1);
    useEffect(()=>{
        async function getFilmes() {

            const listas = {
                "mais-populares": `/${media}/popular`,
                "tendecias-semana": `/trending/${media}/week`,
                "tendecias-dia": `/trending/${media}/day`,
                "brevemente": tv ? "/tv/on_the_air" : "/movie/upcoming",
                "maior-pontuacao": `/${media}/top_rated`,
                "em-cartaz": tv ? "/tv/airing_today" : "/movie/now_playing",
            };
            if(listas[params.type]){
                const data= await axios.get(listas[params.type], {params: {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma, include_adult: false, page}});
                setFilme(data.data.results[0] || {});
                setData(data.data);
            }
            else{
                const f= await axios.get(`${import.meta.env.REACT_APP_APP_URL}/movie/${params.id}?api_key=${import.meta.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=videos,images,reviews,credits,similar,keywords&include_image_language=null,${getIdioma(idioma)}`);
                setFilme(f.data);
            }

            if(params.type==="similares"){
                const data= await axios.get(`${import.meta.env.REACT_APP_APP_URL}/movie/${params.id}/similar?api_key=${import.meta.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`);
                setData(data.data)
            }
            if(params.type==="recomendados"){
                const data= await axios.get(`${import.meta.env.REACT_APP_APP_URL}/movie/${params.id}/recommendations?api_key=${import.meta.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`); 
                setData(data.data)
            }
            
            
            setLoading(true);
        }
        getFilmes()
    },[page])
    const handlePageClick=(e)=>{
        if(e.selected===0){
            setPage(1)
        }
        else{
            setPage(e.selected+1)
        }
        
    }
    return (
        loading===true ? <div className='simi-detalhe'>
        <OpenSource/>
        <Header/>
        <Seo titulo={[filme.title && params.id ? filme.title : null, tv ? t('header.series') : t('ui.filmes')].filter(Boolean).join(' · ')}/>
        <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/w1280${filme.backdrop_path} )`}}>
           <div className="pr">
               <div className="data">
                    {
                        params.type==="mais-populares"||params.type==="maior-pontuacao"||params.type==="brevemente"||params.type==="tendecias-dia" ||params.type==="tendecias-semana"||params.type==="em-cartaz" ?<></>: <h2 className="title"><Play size="32" color="#fff" variant="Bulk"/> {filme.title}</h2>
                    }
                   
                   <h2 className="_p">{
                   params.type==="similares" ? t('ui.filmes_similares') : 
                   params.type==="recomendados" ? t('ui.filmes_recomendados'):
                   params.type==="mais-populares" ? t(tv ? 'ui.series_mais_populares' : 'ui.filmes_mais_populares'):
                   params.type==="tendecias-semana" ? t('ui.tendencias_semana'):
                   params.type==="tendecias-dia" ? t('ui.tendencias_dia'):
                   params.type==="brevemente" ? t(tv ? 'ui.series_no_ar' : 'ui.filmes_a_estrear'):
                   params.type==="em-cartaz" ? t(tv ? 'ui.series_hoje' : 'ui.filmes_em_cartaz'):
                   params.type==="maior-pontuacao" && t(tv ? 'ui.series_maior_pontuacao' : 'ui.filmes_maior_pontuacao')
                   
                   }</h2>
               </div>
           </div>
       </div>
       <div className="todos-actores">
                <div className="titulo">
                    <p>{tv ? t('header.series') : t('ui.filmes')}</p>
                </div>
                <div className="filmeR simil" >
                {
                    data.results.map((item, key)=>{
                            return <DataAll key={key} item={item} type={tv ? "tv" : "filme"}/>
                    })
                }
                </div>

                <ReactPaginate
                    previousLabel={<ArrowLeft2 size="18" color="#fff" variant="Outline"/>}
                    nextLabel={<ArrowRight2 size="18" color="#fff" variant="Outline"/>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={data.total_pages > 500 ? 500 : data.total_pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
   </div>:<Loading/>
    )
}

export default TypeDetalhes
