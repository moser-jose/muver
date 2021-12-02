import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';

import axios from '../api';
import { Genrs } from '../components/Genrs';
import Trailers from '../components/Trailers';
import { useApiContext } from '../contexts/ApiContext';

const Home = () => {
    const{tendencias,filmesdiscover,tvDiscover,pessoasTrending,loading,setLoading}=useApiContext();
    
   
    return (
        loading===true ?
            <div className="container">
                <div className="home">
                    <Header/>
                    <SlideHeader data={tendencias}/>   
                    <Row type="filme" title="Os Filmes mais populares" data={filmesdiscover}/>
                    {/* <Genrs  data={genrsMovie}/> */}
                    <Row type="tv" title="As Séries mais populares" data={tvDiscover}/>
                    <Row type="actor" title="Os Actores mais populares" data={pessoasTrending}/>
                   {/*  <Trailers type="filmes" data={movieId}/> */}
                   {/* <Row type="filme" title="Filmes com maiores pontuações" data={upcoming}/> */}
                </div>
            </div>:
            <></>
    )
}

export default Home
