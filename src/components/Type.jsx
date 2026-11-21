import { t } from '../translate/i18n'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataAll } from './Dados/DataAll'

const Type = ({data,title, type, outher, gender}) => {
    const params = useParams();
    return (
        <div className="populares">
            <div className="mais">
                <p>{title}</p>
                {   data.length > 7 && 
                        outher==="filme_actor" &&
                        type==="filme" && <Link to={`/actores/${params.slug}/${params.id}/filmes`}>{t('ui.ver_mais')}</Link>
                }
                {   data.length > 7 && 
                        outher==="similar" &&
                        type==="filme" && <Link to={`/filme/${params.slug}/${params.id}/similares`}>{t('ui.ver_mais')}</Link>
                }
                {   data.length > 7 &&
                        outher==="recomendations" &&
                        type==="filme" && <Link to={`/filme/${params.slug}/${params.id}/recomendados`}>{t('ui.ver_mais')}</Link>
                }
            </div>


            <div className="filmeR simil" >
                {
                    data && data.slice(0,7).map((item, key)=>{
                        return <DataAll key={key} item={item} type={type}/>
                    })
                }
            </div>
        </div>
    )
}

export default Type
