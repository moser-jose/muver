import { Star } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { DataAll } from './Dados/DataAll'
var slugify = require('slugify')
const Row = ({data,title, type}) => {
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
                        return <DataAll key={key} item={item} type={type}/>
                    })
                }
                
                </div>
               
                
           </div>
            
    )
}

export  default Row
