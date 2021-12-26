import { ArrowLeft2, ArrowRight2, Play, Star, UserOctagon } from 'iconsax-react';
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {getIdioma} from '../../functions'
import slugify from 'slugify';
import axios from '../../api'
import Header from '../Header'
import OpenSource from '../OpenSource'
import Poster from '../../assets/img/poster.jpg'
import Loading from '../Loading';
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const TypeDetalhesActores = () => {
    const params = useParams();
    const [actor, setActor]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        async function getFilmes() {
            const f= await axios.get(`${process.env.REACT_APP_APP_URL}/person/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=images,credits&include_image_language=null,${getIdioma(idioma)}`);
            setActor(f.data);
            setLoading(true);
        }
        getFilmes()
    },[])
    return (
        loading===true ? <div className='simi-detalhe'>
        <OpenSource/>
        <Header/>
        <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/original${actor.profile_path} )`}}>
           <div className="pr">
               <div className="data">
                    {
                       <h2 className="title"><UserOctagon size="32" color="#fff" variant="Bulk"/> {actor.name}</h2>
                    }
                   
                   <h2 className="_p">{
                    params.type==="filmes" && "Filmes Realizados"                    
                   }</h2>
               </div>
           </div>
        </div>
        <div className="todos-actores">
                <div className="titulo">
                    {
                        actor.gender===1?<p>Filmes como actriz</p>:
                        <p>Filmes como actor</p>
                    }
                </div>
                <div className="filmeR simil" >
                {
                    actor.credits.cast.map((item, key)=>{
                            return<a key={key} href={`/filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`}  >
                                <img  src={item.poster_path===null?Poster:`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
                                <div className="info">
                                <span>{item.title}</span>
                                <span className="perc"><Star size="18" color="#cccc32" variant="Bulk"/> {item.vote_average}</span>
                                </div> 
                            </a>
                            
                    })
                }
                </div>
                <div className="titulo" style={{marginTop:'30px'}}>
                    <p>Equipe Técnica</p>
                </div>
                <div className="filmeR simil" >
                {
                    actor.credits.crew.map((item, key)=>{
                            return<a key={key} href={`/filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`}  >
                                <img  src={item.poster_path===null?Poster:`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
                                <div className="info">
                                <span>{item.title}</span>
                                <span className="perc"><Star size="18" color="#cccc32" variant="Bulk"/> {item.vote_average}</span>
                                </div> 
                            </a>
                    })
                }
                </div>
        </div>
   </div>:<Loading/>
    )
}

export default TypeDetalhesActores
