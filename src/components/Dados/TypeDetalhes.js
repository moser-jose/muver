import { ArrowLeft2, ArrowRight2, Play, Star } from 'iconsax-react';
import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import {getIdioma} from '../../functions'
import slugify from 'slugify';
import axios from '../../api'
import Header from '../Header'
import OpenSource from '../OpenSource'
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const TypeDetalhes = () => {
    const params = useParams();
    const [filme, setFilme]=useState([]);
    const [data, setData]=useState([]);
    const [loading, setLoading]=useState(false);
    const [page, setPage]=useState(1);
    useEffect(()=>{
        async function getFilmes() {
            const f= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=videos,images,reviews,credits,similar,keywords&include_image_language=null,${getIdioma(idioma)}`);
            setFilme(f.data);
            if(params.type==="similares"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`);
                setData(data.data)
            }
            else if(params.type==="recomendados"){
                const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`);
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
        <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/original${filme.backdrop_path} )`}}>
           <div className="pr">
               <div className="data">
                   <h2 className="title"><Play size="32" color="#fff" variant="Bulk"/> {filme.title}</h2>
                   <h2 className="_p">{params.type==="similares" ? "Filmes Similares" : params.type==="recomendados" && "Filmes Recomendados"}</h2>
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
                                <img  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
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
                    pageCount={data.total_pages}
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