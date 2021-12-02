import React, { useState,useEffect } from 'react'
import axios from '../api/'
import { ArrowLeft3, ArrowRight3, Profile, Star } from 'iconsax-react';
import { Slide } from 'react-slideshow-image';


const properties = {
    indicators: true,
    arrows:false,
    autoplay:false
  };
  
const Trailers = ({type, data}) => {
    const[movie, setMovie]=useState([]);
    const[serie, setSerie]=useState([]);
    const[loading, setLoading]=useState([]);

    useEffect(() => {
        var arrS=[]
       /*  function getFilmes() {
            data.map((item, key)=>{
                axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=1e42ff5303530233d52e0c4c6dfbd312&language=pt-PT&append_to_response=videos`)
                .then(function (response) {
                    arrF.push(response.data)
                    setMovie(arrF);
                })
                .catch(function (error) {
                    console.log(error);
                })
            });
            setSerie(arrS);
            setLoading(true);
            return arrF
        }
        getFilmes(); */
        var arrF=[]
        /* data.map((item, key)=>{ 
            async function getFilmes() {
                    const t=await axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=1e42ff5303530233d52e0c4c6dfbd312&append_to_response=videos,images,reviews,credits,similar`)
                    arrF.push(t.data)
                    setLoading(true);
                return t.data
            }
            getFilmes()
            
        });
 */

        for (let index = 0; index < data.length; index++) {
            async function getFilmes() {
                const t=await axios.get(`https://api.themoviedb.org/3/movie/${data[index].id}?api_key=1e42ff5303530233d52e0c4c6dfbd312&append_to_response=videos,images,reviews,credits,similar`)
                arrF.push(t.data)
                setLoading(true);
        }
        getFilmes()
        
        }
        


        
        setMovie(arrF)
        setLoading(false);
    }, [])
    console.log(movie)
    return (
        <div className="trailer">
            <div className="titulo">
                <p>Trailers Populares </p>
            </div>
            <div className="trail">
                <div className="tr">
                    {
                        loading===true ?
                            <Slide easing="ease" {...properties}>
                                {
                                    movie && movie.map((item,k) => (
                                        <div className="each-slide" key={k} >
                                            <div className="sl" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
                                                <div className="pr">
                                                    <p className="titulo">{item.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Slide>:<></>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Trailers
