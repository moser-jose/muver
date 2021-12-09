import React, { useState, useEffect } from 'react'
import { useApiContext, useVideoContext } from '../contexts/ApiContext'; 
import { ArrowLeft3, ArrowRight3, Profile, Star } from 'iconsax-react';
import { Slide } from 'react-slideshow-image';
import Trailers from './Trailers';
import OpenSource from './OpenSource';
import VideoModal from './VideoModal';
import slugify from 'slugify';
import {limita} from '../functions'
const properties = {
    indicators: true,
    arrows:false,
    autoplay:true
  };
export const SlideHeader = ({data,type}) => {
    const [list, setList]=useState([])
    const {i18n}=useApiContext();
    useEffect(()=>{
        function randomList(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
        }
        setList(randomList(data))
    },[data])
    return (
        <div>
            
            <OpenSource/>
            <Slide easing="ease" {...properties}>
            {
                list && list.slice(0,5).map((item,k) => (
                    <div className="each-slide" key={k} >
                        <div className="sl" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
                            <div className="pr">
                                {
                                    item.media_type==="tv" || type=="tv" ?
                                        <>
                                            <span className="media-type">
                                            {
                                            item.media_type  ?
                                            item.media_type:
                                            i18n.t('home.tv')
                                            }
                                            </span>
                                            <p className="titulo">{item.name}</p>
                                            <div className="media">
                                            <h5 className="original">{item.original_name}</h5>
                                                <span>
                                                    <Star size="24" color="#cccc32" variant="Bulk"/>
                                                    {item.vote_average}/10
                                                </span>
                                                <span>
                                                    
                                                    <Profile size="24" color="#1a1a1a" variant="Bulk"/>
                                                    {item.vote_count}
                                                </span>
                                            </div>
                                            <p className="texto">{item.overview}</p>
                                            <a href="/" className="ver"><ArrowRight3 size="26" color="#fff" variant="Bulk"/>
                                            {i18n.t('home.ver_mais')}</a>

                                        </>:
                                        <>
                                            <span className="media-type">{
                                            item.media_type  ?
                                            item.media_type:
                                            i18n.t('home.filme')
                                            }</span>
                                            <p className="titulo">{item.title}</p>
                                            
                                            <div className="media">
                                                <h5 className="original">{item.original_title}</h5>
                                                <span>
                                                    <Star size="24" color="#cccc32" variant="Bulk"/>
                                                    {item.vote_average}/10
                                                </span>
                                                <span>
                                                    
                                                    <Profile size="24" color="#1a1a1a" variant="Bulk"/>
                                                    {item.vote_count}
                                                </span>
                                                
                                            </div>
                                            <p className="texto">{limita(item.overview,300)}</p>
                                            <a href={`filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`} className="ver"><ArrowRight3 size="26" color="#fff" variant="Bulk"/>
                                            {i18n.t('home.ver_mais')}</a>
                                        </>
                                }
                            </div>
                            <div className="img">
                                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`}/>
                            </div>
                        </div>
                    </div>
                ))
            }
            </Slide>
        </div>
        
            
    )
}
