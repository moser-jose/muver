import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useApiContext } from '../contexts/ApiContext'; 
import { ArrowRight3, Calendar, Crown, Flash, Hex, Play, PlayCircle, Profile, Star } from 'iconsax-react';
import OpenSource from './OpenSource';
import Header from './Header';
import {limita} from '../functions'

export const SlideDetalhe = ({data,type,certificacao}) => {
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
            return el.job =="Director";
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
           <div className="filme-ho" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${data.backdrop_path})`}}>
                <div className="pr">
                    <div className="cap">
                        <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`}/>
                    </div>
                    <div className="data">
                        {
                            type==="tv"?
                                <>
                                    <span className="media-type">
                                    {i18n.t('home.tv')}
                                    </span>
                                    <p className="titulo">{data.name}</p>
                                    <div className="media">
                                    <h5 className="original">{data.original_name}</h5>
                                        <span>
                                            <Star size="24" color="#cccc32" variant="Bulk"/>
                                            {data.vote_average}/10
                                        </span>
                                        <span>
                                            <Profile size="24" color="#1a1a1a" variant="Bulk"/>
                                            {data.vote_count}
                                        </span>
                                    </div>
                                    <p className="texto">{data.overview}</p>
                                    <a href="/" className="ver"><ArrowRight3 size="26" color="#fff" variant="Bulk"/>
                                    {i18n.t('home.ver_mais')}</a>

                                </>: type==="filme" ?
                                <>
                                    <div className="mediaT">
                                        <span className="media-type">{i18n.t('home.filme')}</span>
                                        <span className="media-type-t"><Play size="16" color="#fff" variant="Bulk"/> {data.status}</span>
                                        <span className="media-type-t"><Calendar size="16" color="#fff" variant="Bulk"/> {data.release_date}</span>
                                    </div>
                                    <p className="titulo">{data.title}</p>
                                    <div className="media">
                                        <div className="tit">
                                            <span>{certificacao.certification}</span>
                                            <h5 className="original">{data.original_title}</h5>
                                        </div>
                                        <span>
                                            <Star size="24" color="#cccc32" variant="Bulk"/>
                                            {data.vote_average}/10
                                        </span>
                                        <span>
                                            
                                            <Profile size="24" color="#1a1a1a" variant="Bulk"/>
                                            {data.vote_count}
                                        </span>
                                        
                                    </div>
                                    <p className="texto">{limita(data.overview,300)}</p>
                                    {data.genres.map((item, key)=>{
                                        return <a key={key} href={`/filmes/genero/${item.id}`} className="ver gen">{item.name}</a>
                                    })}

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
                                    
                                </>:<></>
                        }
                    </div>
                </div>
                <div className="img trailer">
                    
                    {
                        data.videos.results.filter((el)=>{

                            return el.type==="Trailer"
                            
                        }).slice(0,3).map(function (item, key) {
                            return <div key={key} className="trail">
                                <ReactPlayer
                                    width="100%" 
                                    height="100%" 
                                    url={`https://www.youtube.com/watch?v=${item.key}`}
                                    light={true}
                                    playIcon={<></>}
                                  />
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
