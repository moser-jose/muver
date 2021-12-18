import React from 'react'
import { useParams } from 'react-router-dom';
import DataActor from './Dados/DataActor';
const Actor = ({data, titulo, type, act}) => {
    const params = useParams();
    return (
        <div className={`actores ${act===true && 'act-f'}`}>
            {
                act===true ?<>
                    <div className="mais">
                        <p className="titulo">{titulo}</p>
                        {
                            type==="actores" && data.length > 8 && <a href={`/actores`}>Ver mais</a>
                        }
                    </div>
                    <div className="all-act">
                        {
                        type==="actores" && 
                            data.slice(0,8).map((item, key)=>{
                                return <DataActor key={key} item={item} type="act"/>
                            })
                        }
                    </div>
                

                </>:
                <>
                    <div className="mais">
                        <p className="titulo">{titulo}</p>
                        {
                            type==="actores" ? data.cast.length > 9 && <a href={`${params.id}/autores`}>Ver mais</a>:
                            type==="equipe" && data.crew.length > 9 && <a href={`${params.id}/autores`}>Ver mais</a>
                        }
                    </div>
                    <div className="all-act">
                        {
                            type==="actores" ?
                                data.cast.slice(0,9).map((item, key)=>{
                                    return <DataActor key={key} item={item} type={type}/>
                                }):
                            type==="equipe" &&
                                data.crew.slice(0,9).map((item, key)=>{
                                    return <DataActor key={key} item={item} type={type}/>
                                })
                        }
                    </div>
                </>
            }
            
        </div>
    )
}

export default Actor
