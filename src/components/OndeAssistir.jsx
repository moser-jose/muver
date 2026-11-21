import { t } from '../translate/i18n'
import React from 'react'
import slugify from 'slugify'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

// Serviços onde o título está disponível, no país do idioma escolhido (dados JustWatch via TMDB)
const OndeAssistir = ({data}) => {
    const pais = idioma==="en-US" ? "US" : "PT";
    const local = data?.results?.[pais];
    const grupos = [['flatrate','streaming'],['rent','alugar'],['buy','comprar']].filter(([k]) => local?.[k]?.length);
    if (!grupos.length) return null;
    return (
        <div className="onde">
            <div className="onde-topo">
                <p className="titulo">{t('ui.onde_assistir')} <small>({pais})</small></p>
                <a href={local.link} target="_blank" rel="noreferrer">{t('ui.dados_justwatch')} ↗</a>
            </div>
            {grupos.map(([k, rotulo]) => (
                <div className="onde-grupo" key={k}>
                    <span>{t('ui.'+rotulo)}</span>
                    {local[k].map((p) => <a key={p.provider_id} title={p.provider_name} href={`/streaming/${slugify(p.provider_name,{lower:true,strict: true})}/${p.provider_id}`}><img loading="lazy" alt={p.provider_name} src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}/></a>)}
                </div>
            ))}
        </div>
    )
}

export default OndeAssistir
