import Seo from '../components/Seo'
import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import axios from '../api'
import Actor from '../components/Actor'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Row from '../components/Row'
import { SlideHeader } from '../components/SlideHeader'
import { useApiContext } from '../contexts/ApiContext'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);

// Mesma estrutura da página de filmes, com os dados de séries
const Series = () => {
    const {tendencia, tvDiscover, pessoasTrending, loading} = useApiContext();
    const [listas, setListas] = useState({dia: [], semana: [], top: [], noAr: [], hoje: []});
    useEffect(() => {
        const params = {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma};
        Promise.all(['/trending/tv/day', '/trending/tv/week', '/tv/top_rated', '/tv/on_the_air', '/tv/airing_today'].map((url) => axios.get(url, {params})))
            .then(([dia, semana, top, noAr, hoje]) => setListas({dia: dia.data.results, semana: semana.data.results, top: top.data.results, noAr: noAr.data.results, hoje: hoje.data.results}))
            .catch(() => {}); // as filas ficam vazias; o resto da página continua a funcionar
    }, [])

    return (
        loading===true ?
            <div className="container">
                <div className="home">
                    <Header/>
                    <Seo titulo={t('header.series')} descricao={t('ui.seo_series')}/>
                    <SlideHeader type="tv" data={tvDiscover}/>
                    <div className="all-gen">
                        <div className="gen-row">
                            <div className="direito">
                                <Row base="/series" other="maispopular" type="tv" title={t('ui.series_populares')} data={tvDiscover}/>
                                <Row base="/series" other="emcartaz" type="tv" title={t('ui.hoje_na_tv')} data={listas.hoje}/>
                                {
                                    tendencia===false ? <Row base="/series" other="tendencias-dia" type="tv" title={t('ui.tendencias')} data={listas.dia}/>:
                                        <Row base="/series" other="tendencias-semana" type="tv" title={t('ui.tendencias')} data={listas.semana}/>
                                }
                                <Actor act={true} data={pessoasTrending} titulo={t('ui.actores_populares')} type="actores"/>
                                <Row base="/series" other="pontuacao" type="tv" title={t('ui.maior_pontuacao')} data={listas.top}/>
                                <Row base="/series" other="brevemente" type="tv" title={t('ui.no_ar')} data={listas.noAr}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:
            <Loading/>
    )
}

export default Series
