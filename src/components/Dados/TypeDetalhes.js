import { ArrowLeft2, ArrowRight2, Play, Star } from 'iconsax-react';
import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import {getIdioma} from '../../functions'
import slugify from 'slugify';
import axios from '../../api'
import Header from '../Header'
import OpenSource from '../OpenSource'
import { useApiContext } from '../../contexts/ApiContext';
import Poster from '../../assets/img/poster.jpg'
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const TypeDetalhes = () => {
    const {filmesdiscover}=useApiContext();
    const params = useParams();
    const [filme, setFilme]=useState([]);
    const [data, setData]=useState([]);
    const [loading, setLoading]=useState(false);
    const [page, setPage]=useState(1);
    useEffect(()=>{
        async function getFilmes() {

            if(params.type!=="mais-populares" && params.type!=="maior-pontuacao" && params.type!=="brevemente" && params.type !=="tendecias-dia" && params.type!=="tendecias-semana"){
                const f= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=videos,images,reviews,credits,similar,keywords&include_image_language=null,${getIdioma(idioma)}`);
                setFilme(f.data);
            }
            else if(params.type==="mais-populares"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_video=false&with_watch_monetization_types=flatrate&language=${idioma}&include_adult=false&page=${page}`);
                data.data.results.slice(0,1).map((item)=>{
                    setFilme(item);
                })
                setData(data.data);
            }
            
            else if(params.type==="tendecias-semana"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_video=false&with_watch_monetization_types=flatrate&language=${idioma}&include_adult=false&page=${page}`);
                data.data.results.slice(0,1).map((item)=>{
                    setFilme(item);
                })
                setData(data.data);
            }
            else if(params.type==="tendecias-dia"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_video=false&with_watch_monetization_types=flatrate&language=${idioma}&include_adult=false&page=${page}`);
                data.data.results.slice(0,1).map((item)=>{
                    setFilme(item);
                })
                setData(data.data);
            }
            else if(params.type==="brevemente"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_video=false&with_watch_monetization_types=flatrate&language=${idioma}&include_adult=false&page=${page}`);
                data.data.results.slice(0,1).map((item)=>{
                    setFilme(item);
                })
                setData(data.data);
            }
            else if(params.type==="maior-pontuacao"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_video=false&with_watch_monetization_types=flatrate&language=${idioma}&include_adult=false&page=${page}`);
                data.data.results.slice(0,1).map((item)=>{
                    setFilme(item);
                })
                setData(data.data);
            }
            
            if(params.type==="similares"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`);
                setData(data.data)
            }
            if(params.type==="recomendados"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`); 
                setData(data.data)
            }
            
            
            setLoading(true);
        }
        getFilmes()
    },[page])
    console.log(filmesdiscover)
    const handlePageClick=(e)=>{
        if(e.selected===0){
            setPage(1)
        }
        else{
            setPage(e.selected+1)
        }
        
    }
    console.log(data)
    console.log(params.type)
    return (
        loading===true ? <div className='simi-detalhe'>
        <OpenSource/>
        <Header/>
        <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/original${filme.backdrop_path} )`}}>
           <div className="pr">
               <div className="data">
                    {
                        params.type==="mais-populares"||params.type==="maior-pontuacao"||params.type==="brevemente"||params.type==="tendecias-dia" ||params.type==="tendecias-semana" ?<></>: <h2 className="title"><Play size="32" color="#fff" variant="Bulk"/> {filme.title}</h2>
                    }
                   
                   <h2 className="_p">{
                   params.type==="similares" ? "Filmes Similares" : 
                   params.type==="recomendados" ? "Filmes Recomendados":
                   params.type==="mais-populares" ? "Filmes mais populares":
                   params.type==="tendecias-semana" ? "Tendências da Semana":
                   params.type==="tendecias-dia" ? "Tendências do Dia":
                   params.type==="brevemente" ? "Filmes a estrear em breve":
                   params.type==="maior-pontuacao" && "Filmes com maior pontuação"
                   
                   }</h2>
               </div>
           </div>
       </div>
       <div className="todos-actores">
                <div className="titulo">
                    <p>Filmes</p>
                </div>
                <div className="filmeR simil" >
                {
                    data.results.map((item, key)=>{
                            return <a href={`/filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`} key={key} >
                                <img  src={`https://image.tmdb.org/t/p/w300${item.poster_path===null?Poster:item.poster_path}`}/>
                                <div className="info">
                                <span>{item.title}</span>
                                <span className="perc"><Star size="18" color="#cccc32" variant="Bulk"/> {item.vote_average}</span>
                                </div>   
                            </a>
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
   </div>:<></>
    )
}

export default TypeDetalhes
