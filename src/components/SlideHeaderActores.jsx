import React, { useState, useEffect } from 'react'
import { useApiContext } from '../contexts/ApiContext'; 
import { ArrowRight3} from 'iconsax-react';
import { Slide } from 'react-slideshow-image';
import OpenSource from './OpenSource';
import slugify from 'slugify';
import Men from '../assets/img/user-act.jpg'
import Fem from '../assets/img/user-act-f.jpg'
import Header from './Header';
const properties = {
    indicators: true,
    arrows:false,
    autoplay:true
  };
export const SlideHeaderActores = ({data,type}) => {
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
    },[])
   console.log(list)
    return (
        <div>
            <OpenSource/>
            <Header/>
            <Slide  easing="ease" {...properties}>
            {
                list && list.slice(0,5).map((actor,k) => (
                    <div className="each-slide"  key={k} >
                        <div className="sl" style={{'height':'670px','background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${actor.profile_path})`}}>
                            
                            <div className="pr">
                                <div className="data">
                                    <h2 className="_p" style={{fontSize:'40px'}}>{actor.name}</h2>
                                </div>

                                <div className="img">
                                    <img src={actor.gender===2  && actor.profile_path===null ? Men : actor.gender===1 && actor.profile_path===null ? Fem:
                                    actor.gender===0 && actor.profile_path===null ? Men:
                                    `https://image.tmdb.org/t/p/original${actor.profile_path}`}/>
                                </div>
                                <a style={{color:'#fff !important'}} href={`actores/${slugify(actor.name,{lower:true,strict: true})}/${actor.id}`} className="ver acto"><ArrowRight3 size="26" color="#fff" variant="Bulk"/>
                                            ver mais</a>
                            </div>
                        </div>
                    </div>
                ))
            }
            </Slide>
        </div>
        
            
    )
}
