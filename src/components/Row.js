import { Star } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom'
var slugify = require('slugify')
const Row = ({data,title, type}) => {
    console.log("filmes",data)
    return (
           <div className="populares">
               <div className="mais">
               <p>{title}</p>

               {
                   data && data.length > 6 && <a href="/">Ver mais</a>
               }

               </div>

               
                <div className="filmeR" >
                {
                    data && data.slice(0,6).map((item, key)=>{
                            return <a href={`filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`} key={key} >
                                <img  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
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
                            
                    })
                }
                
                </div>
               
                
           </div>
            
    )
}

export  default Row
