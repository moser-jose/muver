import { t } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import axios from '../api'
import {getIdioma,getData} from '../functions'
import Actor from '../components/Actor';
import { Genrs } from '../components/Genrs';
import Header from '../components/Header'
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';
import { useApiContext } from '../contexts/ApiContext';
import Loading from '../components/Loading';
import { Loa } from '../components/Loa';

const idioma= localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);
const Filme = () => {
    const{tendencia,setTendencia, TopMovie,pessoasTrending,filmesTendenciasDia,filmesTendenciasSemana,genrsMovie,filmesdiscover,loading}=useApiContext();
    const [filmBrev, setfilmBrev]=useState([]);
    useEffect(()=>{
        async function Breve(){
            const film=await axios.get(`/movie/upcoming?api_key=${import.meta.env.REACT_APP_API_KEY}&language=${idioma}&page=1&region=${getIdioma(idioma)==='en'?'us':getIdioma(idioma)}`)
            var end=film.data.dates.maximum;  
            var resultProductData = film.data.results.filter(a => {
                return a.release_date >= getData()  && a.release_date <= end;
            });
            setfilmBrev(resultProductData);
        }
        Breve();
    },[])
    
    return (
        loading===true ?
            <>
                <div className="container">
                    <div className="home">
                        <Header/>
                        <SlideHeader type="filme" data={filmesdiscover}/>   
                        <div className="all-gen">
                            <div className="gen-row">
                                {/* <div className="ge">
                                    <Genrs data={genrsMovie}/>
                                </div> */}
                                <div className="direito">
                                    <Row other="maispopular" type="filme" title={t('ui.filmes_populares')} data={filmesdiscover}/>
                                  
                                  {
                                      tendencia===false ? <Row other="tendencias-dia" type="filme" title={t('ui.tendencias')} data={filmesTendenciasDia}/>:
                                        <Row other="tendencias-semana" type="filme" title={t('ui.tendencias')} data={filmesTendenciasSemana}/>
                                  }
                                    
                                    
                                    
                                    <Actor act={true} data={pessoasTrending} titulo={t('ui.actores_populares')} type="actores"/>
                                    <Row other="pontuacao" type="filme" title={t('ui.maior_pontuacao')} data={TopMovie}/>
                                    <Row other="brevemente"   type="filme" title={t('ui.a_estrear')} data={filmBrev}/>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>:
            <Loading/>
    )
}

export default Filme

