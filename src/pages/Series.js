import React from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading';
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';
import { useApiContext } from '../contexts/ApiContext';

const Series = () => {
    const{tendencias,filmesdiscover,tvDiscover,pessoasTrending,loading}=useApiContext();
    
   
    return (
        loading===true ?
            <div className="container">
                <div className="home">
                    <Header/>
                    <SlideHeader type="tv" data={tvDiscover}/>   
                    {/* <Row type="filme" title="Os Filmes mais populares" data={filmesdiscover}/>
                    <Row type="tv" title="As Séries mais populares" data={tvDiscover}/>
                    <Row type="actor" title="Os Actores mais populares" data={pessoasTrending}/> */}
                   </div>
            </div>:
            <Loading/>
    )
}

export default Series

