import React, { useState,useEffect } from 'react'
import axios from '../api/'
import { Slide } from 'react-slideshow-image';

const properties = {
    indicators: true,
    arrows:false,
    autoplay:false
};
  
const Trailers = ({data}) => {
    const[movie, setMovie]=useState([]);
    const[loading, setLoading]=useState([]);

    useEffect(() => {
        var arrF=[]

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
