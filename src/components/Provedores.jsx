import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import slugify from 'slugify'
import axios from '../api'
import { regiao } from '../pages/Descobrir'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

// Serviços de streaming do país, para explorar o catálogo de cada um
const Provedores = () => {
    const [lista, setLista] = useState([]);
    useEffect(() => {
        axios.get('/watch/providers/movie', {params: {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma, watch_region: regiao}})
            .then((r) => setLista(r.data.results.sort((a, b) => (a.display_priorities?.[regiao] ?? 999) - (b.display_priorities?.[regiao] ?? 999)).slice(0, 14)))
            .catch(() => {});
    }, [])
    if (!lista.length) return null;
    return (
        <div className="populares provedores">
            <div className="mais"><span className="p">{t('ui.por_streaming')}</span></div>
            <div className="prov-lista">
                {lista.map((p) => (
                    <a key={p.provider_id} title={p.provider_name} href={`/streaming/${slugify(p.provider_name,{lower:true,strict: true})}/${p.provider_id}`}>
                        <img loading="lazy" alt={p.provider_name} src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}/>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Provedores
