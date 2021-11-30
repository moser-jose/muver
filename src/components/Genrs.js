import React from 'react'

export const Genrs = ({data}) => {
    return (
        <div className="generos">
            <p>Todos os Géneros</p>
            
                <div className="allG">
                   {
                        data && data.map((item, key)=>{
                            return <a href="/" key={key}>{item.name}</a>
                        })
                   }
                </div>
            
            
        </div>
    )
}
