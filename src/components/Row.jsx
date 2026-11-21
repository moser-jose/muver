import { t } from '../translate/i18n'
import React from 'react'
import { useApiContext } from '../contexts/ApiContext'
import { DataAll } from './Dados/DataAll'

// `other` identifica a fila; o valor é a página "Ver mais" correspondente
const LISTAS = {
    "maispopular": "mais-populares",
    "tendencias-semana": "tendecias-semana",
    "tendencias-dia": "tendecias-dia",
    "brevemente": "brevemente",
    "pontuacao": "maior-pontuacao",
    "emcartaz": "em-cartaz",
};
const Row = ({data,title, type,other, base="/filmes"}) => {
    const{tendencia, setTendencia}=useApiContext();
    if (!data || data.length===0) return null;
    return (
           <div className="populares">
               <div className="mais">
                    <span className='p'>
                        {title}
                        {other.startsWith("tendencias") &&
                            <div className='tendenc'>
                                <span className={tendencia===false ? 'active':''} onClick={()=>setTendencia(false)}>{t('ui.dia')}</span>
                                <span className={tendencia===true ? 'active':''} onClick={()=>setTendencia(true)}>{t('ui.semana')}</span>
                                <div className={tendencia === false ? 'animacao s-dia' :'animacao s-semana'}></div>
                            </div>
                        }
                    </span>
                    {LISTAS[other] && data.length > 7 && <a href={`${base}/${LISTAS[other]}`}>{t('ui.ver_mais')}</a>}
               </div>
                <div className="filmeR" >
                    {data.slice(0,7).map((item)=> <DataAll key={item.id} item={item} type={type}/>)}
                </div>
           </div>
    )
}

export  default Row
