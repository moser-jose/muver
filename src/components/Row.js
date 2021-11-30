import React from 'react'
const Row = ({data,title}) => {
    return (
           <div className="populares">
               <div className="mais">
               <p>{title} mais populares</p>
               <a href="/">Ver mais</a>
               </div>
                <div className="filmeR" >
                    {
                        data && data.slice(0,7).map((item, key)=>{
                            return  <a href={`${item.id}`} key={key}>
                                <img  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}/>
                            </a>
                        })
                    }
                </div>
           </div>
            
    )
}

export  default Row
