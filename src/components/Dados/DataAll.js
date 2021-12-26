import { Star } from 'iconsax-react'
import React from 'react'
import slugify from 'slugify'
import Poster from '../../assets/img/poster.jpg'
export const DataAll = ({item, type}) => {
    return (
        <a href={`/filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`} >
            <img  src={item.poster_path===null?Poster:`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
            <div className="info">
                {
                    type==="filme" ? 
                    <span>{item.title}</span>
                    :  type==="tv" &&
                    <span>{item.name}</span>
                }
                <span className="perc"><Star size="18" color="#cccc32" variant="Bulk"/> {item.vote_average}</span>
            </div>   
        </a>
    )
}
