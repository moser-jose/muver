import React from 'react'
import Act from '../assets/img/profile.jpg'
const Actor = ({data, titulo, type}) => {
    return (
        <div className="actores">
            <div className="mais">
            
            <p className="titulo">{titulo}</p>
            {
                type==="actores" ? data.cast.length > 9 && <a href="/">Ver mais</a>:
                type==="equipe" && data.crew.length > 9 && <a href="/">Ver mais</a>
                
            }
            

            </div>
            <div className="all-act">
                {
                   type==="actores" ? data.cast.slice(0,9).map((item, key)=>{
                    return <div className="cast" key={key}>
                           {
                               item.profile_path===null?
                                <img src={Act}/>:
                                <img src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}/>
                           }
                            <h4>{item.original_name}</h4>
                            {
                                item.character!== "" && 
                                <h6><span>como</span>{item.character}</h6>
                            }
                            
                        </div>
                    }):type==="equipe" &&
                    data.crew.slice(0,9).map((item, key)=>{
                        return <div className="cast" key={key}>
                               {
                                   item.profile_path===null?
                                    <img src={Act}/>:
                                    <img src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}/>
                               }
                                <h4>{item.original_name}</h4>
                                {
                                    item.character!== "" && 
                                    <h6><span>{item.job}</span></h6>
                                }
                                
                            </div>
                        })
                }
            </div>
            
        </div>
    )
}

export default Actor
