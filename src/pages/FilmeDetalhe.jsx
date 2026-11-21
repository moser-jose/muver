import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../api'
import {getIdioma} from '../functions'
import Actor from '../components/Actor';
import Collection from '../components/Collection';
import Galery from '../components/Galery';
import Keywords from '../components/Keywords';
import Reviews from '../components/Reviews';
import { SlideDetalhe } from '../components/SlideDetalhe';
import Type from '../components/Type';
import Loading from '../components/Loading';
import OndeAssistir from '../components/OndeAssistir';
import InfoExtra from '../components/InfoExtra';
const idioma= localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);
const FilmeDetalhe = () => {
    const params = useParams();
    const [filme, setFilme]=useState([]);
    const [certificacao, setCertificacao]=useState([]);
    const [colection, setColection]=useState([]);
    const [recomendation, setRecomendation]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        async function getFilmes() {
            const f= await axios.get(`/movie/${params.id}`, {params: {
                api_key: import.meta.env.REACT_APP_API_KEY, language: idioma,
                append_to_response: 'videos,images,reviews,credits,similar,keywords,watch/providers,release_dates,alternative_titles,recommendations',
                include_image_language: `null,${getIdioma(idioma)}`,
                include_video_language: `${getIdioma(idioma)},en`, // trailers, clips e bastidores também em inglês
            }});
            setFilme(f.data);
            setRecomendation({data: f.data.recommendations});
            if(f.data.belongs_to_collection!==null){
                const col= await axios.get(`/collection/${f.data.belongs_to_collection.id}`, {params: {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma}});
                setColection(col)
            }
            // classificação etária do país do idioma escolhido; se não houver, a dos EUA
            const paises=[idioma==="en-US" ? "US" : idioma==="fr-FR" ? "FR" : "PT", "US"];
            const cert=paises.map((p)=>f.data.release_dates.results.find((d)=>d.iso_3166_1===p)?.release_dates.find((r)=>r.certification)).find(Boolean);
            setCertificacao(cert || {});
            setLoading(true);
        }
        getFilmes()
    },[]) 
    return (
        loading===true ? 
        <>
            <SlideDetalhe certificacao={certificacao} data={filme} type="filme" />
            <OndeAssistir data={filme['watch/providers']}/>
            <InfoExtra titulos={filme.alternative_titles.titles} datas={filme.release_dates.results}/>
            <Actor data={filme.credits} titulo={t('ui.elenco')} type="actores"/>
            <Actor data={filme.credits} titulo={t('ui.equipa_tecnica')} type="equipe"/>
            
            <Keywords lang={filme.production_countries} companies={filme.production_companies} poster={filme.poster_path} back={filme.backdrop_path} data={filme.keywords}/>
             
            <Galery type="filme" vid={filme.videos} data={filme.images}/>
            {
                filme.belongs_to_collection && <Collection colection={colection} poster={filme.poster_path} back={filme.backdrop_path} data={filme.belongs_to_collection}/>
            } 
            <div className="simi">
                {filme.similar.results.length!==0 && <Type data={filme.similar.results} outher="similar" type="filme" title={t('ui.filmes_similares')}/>}
                <Reviews data={filme.reviews.results}  />
                {recomendation.data.results.length!==0 && <Type data={recomendation.data.results} outher="recomendations" type="filme" title={t('ui.filmes_recomendados')}/>}
                
            </div>
        </>:
        <Loading/>
    )
}

export default FilmeDetalhe
