import React, { useState, useEffect } from 'react'
import { useApiContext } from '../contexts/ApiContext'; 
import { ArrowRight3, Calendar, Crown, Flash, Hex, Play, PlayCircle, Profile, Star } from 'iconsax-react';
import OpenSource from './OpenSource';
import Header from './Header';
import {limita} from '../functions'
import slugify from 'slugify';

export const SlideDetalhe = ({data,type,certificacao}) => {
    const tv = type==="tv";
    const {setModal, setUrl}=useApiContext();
    const [productor, setProductor]=useState([]);
    const [director, setDirector]=useState([]);
    const [writer, setWriter]=useState([]);
    const {i18n}=useApiContext();
    const Modal=(link)=>{
        setModal(true);
        setUrl(link);
    }

    useEffect(()=>{

        const filterProd=data.credits.crew.find(function (el) {
            return el.job =="Producer";
        });
        const filterDirect=data.credits.crew.find(function (el) {
            return el.job =="Director" || el.job =="Creator";
        });
        const filterWriter=data.credits.crew.find(function (el) {
            return el.job =="Writer";
        });

        setProductor(filterProd)
        setDirector(filterDirect)
        setWriter(filterWriter)
    },[])
    return (
        <div className="film-slide">
           <OpenSource/>
           <Header/>
           <div className="filme-ho" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`}}>
                <div className="pr">
                    <div className="cap">
                        <img alt={data.title || data.name} src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}/>
                    </div>
                    <div className="data">
                        {
                                <>
                                    <div className="mediaT">
                                        <span className="media-type">{i18n.t(tv ? 'home.tv' : 'home.filme')}</span>
                                        <span className="media-type-t"><Play size="16" color="#fff" variant="Bulk"/> {data.status}</span>
                                        <span className="media-type-t"><Calendar size="16" color="#fff" variant="Bulk"/> {data.release_date}</span>
                                    </div>
                                    <p className="titulo">{data.title}</p>
                                    <div className="media">
                                        <div className="tit">
                                            {certificacao.certification && <span>{certificacao.certification}</span>}
                                            <h5 className="original">{data.original_title}</h5>
                                        </div>
                                        <span>
                                            <Star size="24" color="#cccc32" variant="Bulk"/>
                                            {Number(data.vote_average).toFixed(1)}/10
                                        </span>
                                        <span>
                                            
                                            <Profile size="24" color="#1a1a1a" variant="Bulk"/>
                                            {data.vote_count}
                                        </span>
                                        
                                    </div>
                                    <p className="texto">{limita(data.overview,300)}</p>
                                    {data.genres.map((item, key)=>{
                                        return <a key={key} href={`/${tv ? 'series' : 'filmes'}/generos/${slugify(item.name,{lower:true,strict: true})}/${item.id}`} className="ver gen">{item.name}</a>
                                    })}
                                    {data.imdb_id && <a href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noreferrer" className="ver gen">IMDb ↗</a>}

                                    <div className="eq">

                                        {
                                            director &&
                                            <div className="eq-p">
                                                <h4>{director.original_name}</h4>
                                                <h6>{director.job}<Crown size="16" color="#fff" variant="Bulk"/></h6>
                                            </div>
                                        }
                                        
                                        {
                                            productor &&
                                            <div className="eq-p">
                                                <h4>{productor.original_name}</h4>
                                                <h6>{productor.job} <Flash size="16" color="#fff" variant="Bulk"/></h6>
                                            </div>
                                        }
                                        {
                                            writer &&
                                            <div className="eq-p">
                                                <h4>{writer.original_name}</h4>
                                                <h6>{writer.job}<Hex size="16" color="#fff" variant="Bulk"/></h6>
                                            </div>
                                        }

                                    </div>
                                    
                                </>
                        }
                    </div>
                </div>
                <div className="img trailer">
                    
                    {
                        data.videos.results.filter((el)=>{

                            return el.type==="Trailer"
                            
                        }).slice(0,3).map(function (item, key) {
                            return <div key={key} className="trail">
                                <img loading="lazy" alt={item.name} src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}/>
                                <div className="v-c" onClick={()=>Modal(item.key)} title={item.type+ " - "+item.name}>
                                    <div className="pla" onClick={()=>Modal(item.key)}>
                                        <PlayCircle onClick={()=>Modal(item.key)} size="38" color="#fff" variant="Bulk"/>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    
                    
                </div>
            </div>
        </div>            
    )
}
