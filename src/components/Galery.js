import React, { useState } from 'react'
import Images from './Images';
import Videos from './Videos';

const Galery = ({data, vid}) => {
    console.log(vid)
    const [imagens, setImagens]=useState(true);
    const [posters, setPosters]=useState(false);
    const [videos, setVideos]=useState(false);
    const handleImagens=()=>{
        setImagens(true);
        setPosters(false);
        setVideos(false);
    }
    const handlePosters=()=>{
        setImagens(false);
        setPosters(true);
        setVideos(false);
    }
    const handleVideos=()=>{
        setImagens(false);
        setPosters(false);
        setVideos(true);
    }
    return (
        <div className="galeira">
            <div className="gal">
                <p className="titulo">Galeria</p>
                <div className="nav-home">
                    <span onClick={handleImagens}>Imagens</span>
                    <span onClick={handlePosters}>Posters</span>
                    <span onClick={handleVideos}>Videos</span>
                    <div  className={
                            imagens === true ? 'animacao s-imagens' :
                                posters === true ? 'animacao s-posters':
                                    videos === true && 'animacao s-videos'
                        }></div>
                </div>
            </div>
            {
                imagens===true ? <Images data={data.backdrops}/>:
                posters===true ? <Images data={data.posters}/>:
                videos===true && <Videos data={vid}/>
            }
            
        </div>
    )
}

export default Galery
