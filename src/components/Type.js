import React from 'react'
import { Star } from 'iconsax-react'
import { Link, useParams } from 'react-router-dom'
var slugify = require('slugify')

const Type = ({data,title, type, outher}) => {
    const params = useParams();
    return (
        <div className="populares">
               <div className="mais">
               <p>{title}</p>

               {data.length > 7 && 
               
                   outher==="similar" &&
                   type==="filme" && <Link to={`/filme/${params.slug}/${params.id}/similares`}>Ver mais</Link>
                }
                {data.length > 7 &&
                   outher==="recomendations" &&
                   type==="filme" && <Link to={`/filme/${params.slug}/${params.id}/recomendados`}>Ver mais</Link>
                }
               
               </div>

               {
                   type === "actor" ?
                   <div className="filmeR" >
                    {
                        data && data.slice(0,7).map((item, key)=>{
                                return <Link className="actor-p" to={`${item.id}`} key={key} >
                                    <img  src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}/>
                                    <div className="info">
                                        <span>{item.name}</span>
                                        
                                    </div>   
                                </Link>
                        })
                    }
                    
                </div>:
                <div className="filmeR simil" >
                {
                    data && data.slice(0,7).map((item, key)=>{
                            return <a href={`/filme/${slugify(item.title,{lower:true,strict: true})}/${item.id}`} key={key} >
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
               }
                
           </div>
    )
}

export default Type
