import { t } from '../translate/i18n'
import React from 'react'
import { useParams } from 'react-router-dom';
import DataActor from './Dados/DataActor';
import { agrupar } from '../api';
const Actor = ({data, titulo, type, act}) => {
    const params = useParams();
    const lista = act===true ? data : type==="actores" ? agrupar(data.cast, 'character') : agrupar(data.crew, 'job');
    return (
        <div className={`actores ${act===true && 'act-f'}`}>
            {
                act===true ?<>
                    <div className="mais">
                        <p className="titulo">{titulo}</p>
                        {
                            type==="actores" && data.length > 9 && <a href={`/actores`}>{t('ui.ver_mais')}</a>
                        }
                    </div>
                    <div className="all-act">
                        {
                        type==="actores" && 
                            data.slice(0,9).map((item, key)=>{
                                return <DataActor key={key} item={item} type="act"/>
                            })
                        }
                    </div>
                

                </>:
                <>
                    <div className="mais">
                        <p className="titulo">{titulo}</p>
                        {lista.length > 9 && <a href={`${params.id}/autores`}>{t('ui.ver_mais')}</a>}
                    </div>
                    <div className="all-act">
                        {lista.slice(0,9).map((item, key)=> <DataActor key={key} item={item} type={type}/>)}
                    </div>
                </>
            }
            
        </div>
    )
}

export default Actor
