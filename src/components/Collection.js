import React from 'react'
import {limita} from '../functions'
var slugify = require('slugify')
const Collection = ({data, colection, back, poster}) => {

    return (
        <div className="colecao" 
        style={{'background': 
        `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.6)),url(https://image.tmdb.org/t/p/original${data.backdrop_path===null ? back:data.backdrop_path})`}}>
            
            <div className="data">
                <div className="colect">
                    <h2>{data.name}</h2>
                    <span>Inclui filmes como</span>
                    {
                        colection.data.parts.slice(0,8).map((item, key)=>{
                            return <a key={key} className="fi" href={`/filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`}>{item.title}</a>
                        })
                    }
                    <p>{limita(colection.data.overview,300)}</p>
                    <a  className="ver" href="/">Ver colecção</a>
                </div>
                <img src={`https://image.tmdb.org/t/p/w300${data.poster_path===null ? poster:data.poster_path}`}/>
            </div>
            

        </div>
    )
}

export default Collection
