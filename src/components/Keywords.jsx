import { t } from '../translate/i18n'
import React from 'react'
import slugify from 'slugify'

const Keywords = ({data, back,lang, companies, networks=[]}) => {
    return (
        <div className="colecao" 
        style={{'background': 
        `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.6)),url(https://image.tmdb.org/t/p/w1280${back})`}}>
            
            <div className="data">
                <div className="colect">
                    <h2>{t('ui.palavras_chave')}</h2>
                        {
                            data.keywords.slice(0,18).map((item, key)=>{
                                return <a key={key} className="fi" href={`/keywords/${slugify(item.name,{lower:true,strict: true})}/${item.id}`}>{item.name}</a>
                            })
                        }
                       <div className="pais">
                            {
                                lang.map((item, key)=>{
                                    return <a className="imgK" key={key} title={item.name} href={`/pais/${item.iso_3166_1.toLowerCase()}`}>
                                            <img src={`https://flagcdn.com/w320/${item.iso_3166_1.toLowerCase()}.png`} alt={item.name}/>
                                        </a>
                                })
                            }
                       </div>
                </div>
                <div className="colect">
                        <div className="img-k">
                            {networks.map((item) => item.logo_path && <a key={'c'+item.id} title={item.name} href={`/canal/${slugify(item.name,{lower:true,strict: true})}/${item.id}`}><img loading="lazy" alt={item.name} src={`https://image.tmdb.org/t/p/w300${item.logo_path}`}/></a>)}
                            {
                                companies.slice(0,6).map((item, key)=>{
                                    return item.logo_path && <a key={key} title={item.name} href={`/produtora/${slugify(item.name,{lower:true,strict: true})}/${item.id}`}><img loading="lazy" alt={item.name} src={`https://image.tmdb.org/t/p/w300${item.logo_path}`}/></a>
                                })
                            }
                        </div>
                </div>
            </div>
            

        </div>
    )
}

export default Keywords
