import React from 'react'
import Galery from '../components/Galery';
import { Genrs } from '../components/Genrs';
import Header from '../components/Header'
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';
import VideoModal from '../components/VideoModal';
import { useApiContext } from '../contexts/ApiContext';

const Filme = () => {
    const{genrsMovie,tendencias,filmesdiscover,tvDiscover,pessoasTrending,loading}=useApiContext();
    
   
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
                                    {/* <p>Géneros</p> */}
                                    <Genrs data={genrsMovie}/>
                                </div>
                                <Row type="filme" title="Os Filmes mais populares" data={filmesdiscover}/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>:
            <></>
    )
}

export default Filme

