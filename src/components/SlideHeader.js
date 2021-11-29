import React from 'react'
import { useVideoContext } from '../contexts/ApiContext'; 
import { Profile, Star } from 'iconsax-react';
import { Slide } from 'react-slideshow-image';

const properties = {
    indicators: true,
    arrows:false,/* 
    autoplay:false */
  };
export const SlideHeader = () => {
    const {tendencias}=useVideoContext();
    return (
            <Slide easing="ease" {...properties}>
            {
                tendencias && tendencias.slice(0,5).map((item,k) => (
                    <div className="each-slide" key={k} >
                        
                        <div style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
                        
                            <div className="pr">
                                {
                                    item.media_type==="tv" ?
                                        <>
                                            <span className="media-type">{item.media_type}</span>
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
                                        </>:
                                        <>
                                            <span className="media-type">{item.media_type}</span>
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
                                            <p className="texto">{item.overview}</p>
                                        </>
                                }
                            </div>
    
                        </div>
                    </div>
                ))
            }
            </Slide>
            
    )
}
