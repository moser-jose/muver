import React, { useEffect, useState } from 'react'
import axios from '../api'
import {getIdioma,getData} from '../functions'
import Actor from '../components/Actor';
import { Genrs } from '../components/Genrs';
import Header from '../components/Header'
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';
import { useApiContext } from '../contexts/ApiContext';

const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const Filme = () => {
    const{pessoasTrending,filmesTendencias,genrsMovie,filmesdiscover,loading}=useApiContext();
    const [filmBrev, setfilmBrev]=useState([]);
   
    useEffect(()=>{
        async function Breve(){
            const film=await axios.get(`/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&page=1&region=${getIdioma(idioma)}`)
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
                                <div className="ge">
                                    <Genrs data={genrsMovie}/>
                                </div>
                                <div className="direito">
                                    <Row type="filme" title="Os Filmes mais populares" data={filmesdiscover}/>
                                    <Row type="filme" title="Tendências" data={filmesTendencias}/>
                                    <Actor act={true} data={pessoasTrending} titulo="Actores Populares" type="actores"/>
                                    <Row type="filme" title="Filmes a estrear em breve" data={filmBrev}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>:
            <></>
    )
}

export default Filme

