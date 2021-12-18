import React from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading';
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';
import { useApiContext } from '../contexts/ApiContext';

const Home = () => {
    const{tendencias,filmesdiscover,tvDiscover,pessoasTrending,loading}=useApiContext();
    
   
    return (
        loading===true ?
            <div className="container">
                <div className="home">
                    <Header/>
                    <SlideHeader  data={tendencias}/>   
                    <Row type="filme" title="Os Filmes mais populares" data={filmesdiscover}/>
                    {/* <Genrs  data={genrsMovie}/> */}
                    <Row type="tv" title="As Séries mais populares" data={tvDiscover}/>
                    <Row type="actor" title="Os Actores mais populares" data={pessoasTrending}/>
                   {/*  <Trailers type="filmes" data={movieId}/> */}
                   {/* <Row type="filme" title="Filmes com maiores pontuações" data={upcoming}/> */}
                </div>
            </div>:
            <Loading/>
    )
}

export default Home
