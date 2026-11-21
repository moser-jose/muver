import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import axios from '../api'
import slugify from 'slugify'
import Poster from '../assets/img/poster.jpg'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

// Elenco convidado de um episódio, pedido só quando se abre
const Convidados = ({serieId, temporada, episodio}) => {
    const [lista, setLista] = useState(null);
    const abrir = (e) => {
        if (!e.target.open || lista) return;
        axios.get(`/tv/${serieId}/season/${temporada}/episode/${episodio}/credits`, {params: {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma}})
            .then((r) => setLista(r.data.guest_stars)).catch(() => setLista([]));
    }
    return (
        <details className="convidados" onToggle={abrir}>
            <summary>{t('ui.convidados')}</summary>
            {lista === null ? <small>{t('home.carregar')}...</small> :
             lista.length === 0 ? <small>{t('ui.sem_convidados')}</small> :
             <ul>
                {lista.map((a) => <li key={a.credit_id}><a href={`/actores/${slugify(a.name,{lower:true,strict: true})}/${a.id}`}>{a.name}</a>{a.character && <small> — {a.character}</small>}</li>)}
             </ul>}
        </details>
    )
}

// Temporadas de uma série; os episódios só são pedidos quando a temporada é escolhida
const Temporadas = ({serieId, temporadas}) => {
    const lista = temporadas.filter((s) => s.episode_count > 0);
    const [numero, setNumero] = useState((lista.find((s) => s.season_number > 0) || lista[0])?.season_number);
    const [episodios, setEpisodios] = useState(null);
    useEffect(() => {
        if (numero === undefined) return;
        let activo = true;
        setEpisodios(null);
        axios.get(`/tv/${serieId}/season/${numero}`, {params: {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma}})
            .then((r) => activo && setEpisodios(r.data.episodes))
            .catch(() => activo && setEpisodios([]));
        return () => { activo = false };
    }, [numero])

    if (!lista.length) return null;
    return (
        <div className="temporadas">
            <p className="titulo">{t('ui.temporadas')}</p>
            <div className="temp-lista">
                {lista.map((s) => (
                    <button type="button" key={s.id} className={s.season_number===numero ? 'temp activa' : 'temp'} onClick={() => setNumero(s.season_number)}>
                        <img loading="lazy" alt="" src={s.poster_path ? `https://image.tmdb.org/t/p/w185${s.poster_path}` : Poster}/>
                        <strong>{s.name}</strong>
                        <small>{(s.air_date || '').slice(0,4)} · {s.episode_count} {t('ui.episodios')}</small>
                    </button>
                ))}
            </div>
            <div className="episodios">
                {episodios === null ? <p className="ep-vazio">{t('home.carregar')}...</p> :
                 episodios.length === 0 ? <p className="ep-vazio">{t('ui.sem_episodios')}</p> :
                 episodios.map((e) => (
                    <div className="ep" key={e.id}>
                        {e.still_path && <img loading="lazy" alt="" src={`https://image.tmdb.org/t/p/w300${e.still_path}`}/>}
                        <div>
                            <h4>{e.episode_number}. {e.name}</h4>
                            <small>{[e.air_date, e.runtime && `${e.runtime} min`, e.vote_average > 0 && `★ ${e.vote_average.toFixed(1)}`].filter(Boolean).join(' · ')}</small>
                            {e.overview && <p>{e.overview}</p>}
                            <Convidados serieId={serieId} temporada={numero} episodio={e.episode_number}/>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    )
}

export default Temporadas
