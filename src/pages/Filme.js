import React, { useEffect, useState } from 'react'
import axios from '../api'
import Actor from '../components/Actor';
import Galery from '../components/Galery';
import { Genrs } from '../components/Genrs';
import Header from '../components/Header'
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';
import VideoModal from '../components/VideoModal';
import { useApiContext } from '../contexts/ApiContext';

const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const Filme = () => {
    const{pessoasTrending,filmesTendencias,genrsMovie,filmesdiscover,loading}=useApiContext();
    const [filmBrev, setfilmBrev]=useState([]);
   
    useEffect(()=>{
        const getData=()=>{
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            var dataAtual =  ano+ '-' + mes + '-' + dia;
            return dataAtual;
        }
        getData()
        const getIdioma=()=>{
            let id="PT"
            if(idioma==="en-US"){
                id="US"
            }
            else if(idioma==="fr-FR"){
                id="FR"
            }
            else{
                id="PT"
            }
            return id
        }
        async function Breve(){
            const film=await axios.get(`/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&page=1&region=${getIdioma()}`)
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

