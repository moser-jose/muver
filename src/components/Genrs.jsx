import { t } from '../translate/i18n'
import React from 'react'
import slugify from 'slugify'

export const Genrs = ({data}) => {
    return (
        <div className="generos">
            <p>{t('ui.generos')}</p>
            
                <div className="allG">
                   {
                        data && data.map((item, key)=>{
                            return <a href={`/filmes/generos/${slugify(item.name,{lower:true,strict: true})}/${item.id}`} key={key}>{item.name}</a>
                        })
                   }
                </div>
            
            
        </div>
    )
}
