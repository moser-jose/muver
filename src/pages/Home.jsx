import Seo from '../components/Seo'
import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import axios from '../api'
import Actor from '../components/Actor'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Row from '../components/Row'
import Provedores from '../components/Provedores'
import { SlideHeader } from '../components/SlideHeader'
import { useApiContext } from '../contexts/ApiContext'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

// Página inicial: mistura filmes, séries e actores
const Home = () => {
    const {tendencia, tendencias, filmesdiscover, tvDiscover, pessoasTrending, filmesTendenciasDia, filmesTendenciasSemana, TopMovie, loading} = useApiContext();
    const [series, setSeries] = useState({top: [], dia: [], semana: []});
    useEffect(() => {
        const params = {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma};
        Promise.all(['/tv/top_rated', '/trending/tv/day', '/trending/tv/week'].map((url) => axios.get(url, {params})))
            .then(([top, dia, semana]) => setSeries({top: top.data.results, dia: dia.data.results, semana: semana.data.results}))
            .catch(() => {}); // as filas de séries ficam escondidas
    }, [])

    if (loading!==true) return <Loading/>
    // o destaque mistura filmes e séries em tendência (a lista também traz pessoas, que ficam de fora)
    const destaque = tendencias.filter((x) => (x.media_type==="movie" || x.media_type==="tv") && x.backdrop_path);
    return (
        <div className="container">
            <div className="home">
                <Header/>
                <Seo/>
                <SlideHeader data={destaque}/>
                <div className="all-gen">
                    <div className="gen-row">
                        <div className="direito">
                            <Row other="maispopular" type="filme" title={t('ui.filmes_populares')} data={filmesdiscover}/>
                            <Row base="/series" other="maispopular" type="tv" title={t('ui.series_populares')} data={tvDiscover}/>
                            <Actor act={true} data={pessoasTrending} titulo={t('ui.actores_populares')} type="actores"/>
                            <Provedores/>
                            {
                                tendencia===false ? <Row other="tendencias-dia" type="filme" title={t('ui.filmes_tendencia')} data={filmesTendenciasDia}/>:
                                    <Row other="tendencias-semana" type="filme" title={t('ui.filmes_tendencia')} data={filmesTendenciasSemana}/>
                            }
                            {
                                tendencia===false ? <Row base="/series" other="tendencias-dia" type="tv" title={t('ui.series_tendencia')} data={series.dia}/>:
                                    <Row base="/series" other="tendencias-semana" type="tv" title={t('ui.series_tendencia')} data={series.semana}/>
                            }
                            <Row other="pontuacao" type="filme" title={t('ui.filmes_maior_pontuacao')} data={TopMovie}/>
                            <Row base="/series" other="pontuacao" type="tv" title={t('ui.series_maior_pontuacao')} data={series.top}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
