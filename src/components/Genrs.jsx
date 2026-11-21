import React from 'react'
import slugify from 'slugify'

export const Genrs = ({data}) => {
    return (
        <div className="generos">
            <p>Todos os Géneros</p>
            
                <div className="allG">
                   {
                        data && data.map((item, key)=>{
                            return <a href={`/filmes/generos/${slugify(item.name,{lower:true,strict: true})}/${item.id}`} key={key}>{item.name}</a>
                        })
                   }
                </div>
            
            
        </div>
    )
}
