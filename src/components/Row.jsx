import { t } from '../translate/i18n'
import { Star } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useApiContext } from '../contexts/ApiContext'
import { DataAll } from './Dados/DataAll'
import slugify from 'slugify'
const Row = ({data,title, type,other}) => {
    const{tendencia, setTendencia}=useApiContext();
    return (
           <div className="populares">
               <div className="mais">
               <span className='p'>{
                    other==="maispopular" ? title:
                    other==="tendencias-semana" ? <>{title} 
                        <div className='tendenc'>
                            <span  className={tendencia===false ? 'active':''} onClick={()=>setTendencia(false)}>{t('ui.dia')}</span>
                            <span className={tendencia===true ? 'active':''} onClick={()=>setTendencia(true)}>{t('ui.semana')}</span>
                            <div  className={
                                tendencia === false ? 'animacao s-dia' :'animacao s-semana'
                            }></div>
                        </div>
                    </>:
                    other==="tendencias-dia" ? <>{title} 
                        <div className='tendenc'>
                            <span  className={tendencia===false ? 'active':''} onClick={()=>setTendencia(false)}>{t('ui.dia')}</span>
                            <span className={tendencia===true ? 'active':''} onClick={()=>setTendencia(true)}>{t('ui.semana')}</span>
                            <div  className={
                                tendencia === false ? 'animacao s-dia' :'animacao s-semana'
                            }></div>
                        </div>
                    </>:
                    other==="pontuacao" ? title :
                    other==="brevemente" && title
                 }</span>
                    {
                        other==="maispopular"?
                        data && data.length > 7 && <a href="/filmes/mais-populares">{t('ui.ver_mais')}</a>:
                        other==="tendencias-semana" ?
                        data && data.length > 7 && <a href="/filmes/tendecias-semana">{t('ui.ver_mais')}</a>:
                        other==="tendencias-dia" ?
                        data && data.length > 7 && <a href="/filmes/tendecias-dia">{t('ui.ver_mais')}</a>:
                        other==="brevemente" ?
                        data && data.length > 7 && <a href="/filmes/brevemente">{t('ui.ver_mais')}</a>:
                        other==="pontuacao" &&
                        data && data.length > 7 && <a href="/filmes/maior-pontuacao">{t('ui.ver_mais')}</a>
                    }
               </div>
               
                <div className="filmeR" >
                {
                    data && data.slice(0,7).map((item, key)=>{
                        return <DataAll key={key} item={item} type={type}/>
                    })
                }
                
                </div>
               
                
           </div>
            
    )
}

export  default Row
