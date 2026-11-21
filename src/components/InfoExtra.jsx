import { t, i18n } from '../translate/i18n'
import React from 'react'

// Estreias por país e títulos alternativos; fechado por omissão para não alongar a página
const InfoExtra = ({titulos=[], datas=[]}) => {
    const estreias = datas
        .map((d) => ({pais: d.iso_3166_1, ...(d.release_dates.find((r) => r.type===3) || d.release_dates[0])}))
        .filter((d) => d.release_date)
        .sort((a, b) => a.release_date.localeCompare(b.release_date));
    if (!estreias.length && !titulos.length) return null;
    return (
        <details className="onde info-extra">
            <summary>{t('ui.mais_info')}</summary>
            {estreias.length > 0 && <>
                <h4>{t('ui.estreias')}</h4>
                <ul className="estreias">
                    {estreias.map((d) => (
                        <li key={d.pais}>
                            <img loading="lazy" alt={d.pais} src={`https://flagcdn.com/w40/${d.pais.toLowerCase()}.png`}/>
                            {new Date(d.release_date).toLocaleDateString(i18n.language)}
                            {d.certification && <small>{d.certification}</small>}
                        </li>
                    ))}
                </ul>
            </>}
            {titulos.length > 0 && <>
                <h4>{t('ui.titulos_alt')}</h4>
                <ul className="titulos-alt">
                    {titulos.map((x, k) => <li key={k}>{x.title} <small>{x.iso_3166_1}</small></li>)}
                </ul>
            </>}
        </details>
    )
}

export default InfoExtra
