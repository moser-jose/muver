import React, { createContext,useEffect, useState, useContext } from 'react';
import axios from '../api';
import {PT,US,FR} from '../api/url';
import { i18n } from '../translate/i18n'
import {getIdioma} from '../functions'
export const StateContext = createContext();
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
export const ApiContext = ({ children }) => {
    const [selectIdioma, setSelectIdioma]=useState("PT");
    const [tendencias, setTendencias]=useState([]);
    const [filmesdiscover, setFilmesDiscover]=useState([]);
    const [tvDiscover, setTvDiscover]=useState([]);
    const [genrsMovie, setGenrsMovie]=useState([]);
    const [TopMovie, setTopMovie]=useState([]);
    const [pessoasTrending, setPessoasTreding]=useState([]);
    const [loading,setLoading ]=useState(false)
    const [modal, setModal]=useState(false);
    const [url, setUrl]=useState("");
    const [filmesTendenciasSemana, setfilmesTendenciasSemana]=useState([]);
    const [filmesTendenciasDia, setfilmesTendenciasDia]=useState([]);
    const [filmesBrevemente, setfilmesBrevemente]=useState([]);
    const [tendencia, setTendencia]=useState(false);
    useEffect(() => {
        setSelectIdioma(getIdioma(idioma).toUpperCase());
        const language=getIdioma(idioma)==="en" ? US:
                        getIdioma(idioma)==="pt" ? PT:
                        getIdioma(idioma)==="fr" ? FR:PT

        const getTendencias = async (url)=> {
             const data= await Promise.all([
                await axios.get(url.tendenciasPT),
                await axios.get(url.filmesDiscover),
                await axios.get(url.tvDiscover),
                await axios.get(url.generosFilmes),
                await axios.get(url.pessoasTrending),
                await axios.get(url.filmesTendenciasSemana),
                await axios.get(url.filmesTendenciasDia),
                await axios.get(url.filmesBrevemente),
                await axios.get(url.filmesTop)
            ])
            setTendencias(data[0].data.results);
            setFilmesDiscover(data[1].data.results);
            setTvDiscover(data[2].data.results);
            setGenrsMovie(data[3].data.genres);
            setPessoasTreding(data[4].data.results);
            setfilmesTendenciasSemana(data[5].data.results);
            setfilmesTendenciasDia(data[6].data.results);
            setfilmesBrevemente(data[7]);
            setTopMovie(data[8].data.results);
            setLoading(true);
        }
        getTendencias(language);
    }, [])
    
    return (
        <StateContext.Provider
            value={{tendencia, setTendencia,TopMovie,filmesBrevemente,filmesTendenciasDia,filmesTendenciasSemana,url, setUrl,modal, setModal, i18n,loading,setLoading,pessoasTrending,tendencias,filmesdiscover,tvDiscover,genrsMovie,selectIdioma, setSelectIdioma }}>
            {children}
        </StateContext.Provider>
    );
};

export const useApiContext = () => useContext(StateContext);
