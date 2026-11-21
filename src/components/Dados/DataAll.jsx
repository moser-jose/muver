import { Star } from 'iconsax-react'
import React from 'react'
import slugify from 'slugify'
import Poster from '../../assets/img/poster.jpg'
export const DataAll = ({item, type}) => {
    const conteudo = <>
            <img loading="lazy" alt={item.title || item.name} src={item.poster_path===null?Poster:`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
            <div className="info">
                <span className="nome">{item.title || item.name}</span>
                <span className="meta">
                    <span>{(item.release_date || item.first_air_date || '').slice(0,4)}</span>
                    {item.vote_average > 0 && <span className="perc"><Star size="14" color="#f5c518" variant="Bold"/> {item.vote_average.toFixed(1)}</span>}
                </span>
            </div>
    </>
    return (
        <a href={`/${type==="tv" ? 'serie' : 'filme'}/${slugify(item.title || item.name || '',{lower:true,strict: true})}/${item.id}`} >{conteudo}</a>
    )
}
