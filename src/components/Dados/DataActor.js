import React from 'react'
import slugify from 'slugify'
import Act from '../../assets/img/profile.jpg'

const DataActor = ({item, type}) => {
    return (
        <a href={`/actores/${slugify(item.name,{lower:true,strict: true})}/${item.id}`} className="cast">
            {
                item.profile_path===null?
                    <img src={Act}/>:
                    <img src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}/>
            }
            {
                
                type==="act" ? <h4>{item.name}</h4>:<h4>{item.original_name}</h4>
            }
            
            {
                type==="actores" ?
                <>
                    {item.character!== "" && 
                    <h6><span>como</span>{item.character}</h6>}
                </>:type==="equipe" &&
                <>
                    {item.character!== "" && 
                    <h6><span>como</span>{item.job}</h6>}
                </>
            }
            
        </a>
    )
}

export default DataActor
