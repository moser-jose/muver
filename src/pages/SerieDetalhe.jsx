import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api'
import { getIdioma } from '../functions'
import Actor from '../components/Actor'
import Galery from '../components/Galery'
import Keywords from '../components/Keywords'
import Reviews from '../components/Reviews'
import { SlideDetalhe } from '../components/SlideDetalhe'
import Type from '../components/Type'
import Loading from '../components/Loading'
import Temporadas from '../components/Temporadas'
import OndeAssistir from '../components/OndeAssistir'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

// Converte a resposta de /tv para o formato de filme que os componentes já conhecem
export const serieComoFilme = (s) => ({
    ...s,
    title: s.name,
    original_title: s.original_name,
    release_date: s.first_air_date,
    imdb_id: s.external_ids?.imdb_id,
    keywords: {keywords: s.keywords?.results || []},
    credits: {
        cast: s.aggregate_credits.cast.map((a) => ({...a, character: a.roles?.[0]?.character || ''})),
        crew: [
            ...(s.created_by || []).map((c) => ({...c, original_name: c.name, job: 'Creator'})),
            ...s.aggregate_credits.crew.map((a) => ({...a, job: a.jobs?.[0]?.job || a.department})),
        ],
    },
});

const Conteudo = ({id}) => {
    const [serie, setSerie] = useState(null);
    const [erro, setErro] = useState(false);
    useEffect(() => {
        axios.get(`/tv/${id}`, {params: {
            api_key: import.meta.env.REACT_APP_API_KEY, language: idioma,
            append_to_response: 'videos,images,reviews,aggregate_credits,similar,recommendations,keywords,content_ratings,watch/providers,external_ids',
            include_image_language: `null,${getIdioma(idioma)}`,
            include_video_language: `${getIdioma(idioma)},en`,
        }}).then((r) => setSerie(serieComoFilme(r.data))).catch(() => setErro(true));
    }, [])

    if (erro) return <div className="center"><span>{t('ui.nenhum')}</span></div>
    if (!serie) return <Loading/>
    const pais = idioma==="en-US" ? "US" : "PT";
    const classificacao = serie.content_ratings.results.find((c) => c.iso_3166_1===pais)?.rating;
    return (
        <>
            <SlideDetalhe certificacao={{certification: classificacao}} data={serie} type="tv"/>
            <OndeAssistir data={serie['watch/providers']}/>
            <Temporadas serieId={serie.id} temporadas={serie.seasons}/>
            {serie.credits.cast.length!==0 && <Actor data={serie.credits} titulo={t('ui.elenco')} type="actores"/>}
            {serie.credits.crew.length!==0 && <Actor data={serie.credits} titulo={t('ui.equipa_tecnica')} type="equipe"/>}
            <Keywords lang={serie.production_countries} networks={serie.networks} companies={serie.production_companies} back={serie.backdrop_path} data={serie.keywords}/>
            <Galery type="filme" vid={serie.videos} data={serie.images}/>
            <div className="simi">
                {serie.similar.results.length!==0 && <Type data={serie.similar.results} type="tv" title={t('ui.series_similares')}/>}
                <Reviews data={serie.reviews.results}/>
                {serie.recommendations.results.length!==0 && <Type data={serie.recommendations.results} type="tv" title={t('ui.series_recomendadas')}/>}
            </div>
        </>
    )
}

// a key recarrega tudo quando se passa de uma série para outra
const SerieDetalhe = () => {
    const {id} = useParams();
    return <Conteudo key={id} id={id}/>
}

export default SerieDetalhe
