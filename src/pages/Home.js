import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import Row from '../components/Row';
import { SlideHeader } from '../components/SlideHeader';
import url from '../api/url';
import axios from '../api';
import { Genrs } from '../components/Genrs';

const Home = () => {
    const [tendencias, setTendencias]=useState([]);
    const [filmesdiscover, setFilmesDiscover]=useState([]);
    const [tvDiscover, setTvDiscover]=useState([]);
    const [genrsMovie, setGenrsMovie]=useState([]);
    const [loading,setLoading ]=useState(false)

    useEffect(() => {
        async function getTendencias() {
            const t= await axios.get(url.tendenciasPT);
            const d= await axios.get(url.filmesDiscover);
            const tv= await axios.get(url.tvDiscover);
            const gM= await axios.get(url.generosFilmes);
            setTendencias(t.data.results);
            setFilmesDiscover(d.data.results);
            setTvDiscover(tv.data.results);
            setGenrsMovie(gM.data.genres);
            setLoading(true);
        }
       getTendencias();
    }, [])
    
    return (
        loading===true ?
            <div className="container">
                <div className="home">
                    <Header/>
                    <SlideHeader data={tendencias}/>   
                    <Row title="Os Filmes" data={filmesdiscover}/>
                    <Genrs data={genrsMovie}/>
                    <Row title="As Séries" data={tvDiscover}/>
                    
                </div>
            </div>:
            <></>
    )
}

export default Home
