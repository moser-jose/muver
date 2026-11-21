import React, { createContext,useEffect, useState, useContext } from 'react';
import axios from '../api';
import {PT,US} from '../api/url';
import { i18n } from '../translate/i18n'
import {getIdioma} from '../functions'
export const StateContext = createContext();
const idioma= localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);
export const ApiContext = ({ children }) => {
    const [selectIdioma, setSelectIdioma]=useState("PT");
    const [tendencias, setTendencias]=useState([]);
    const [filmesdiscover, setFilmesDiscover]=useState([]);
    const [tvDiscover, setTvDiscover]=useState([]);
    const [genrsMovie, setGenrsMovie]=useState([]);
    const [TopMovie, setTopMovie]=useState([]);
    const [pessoasTrending, setPessoasTreding]=useState([]);
    const [loading,setLoading ]=useState(false)
    const [erro, setErro]=useState(null); // estado HTTP do último pedido falhado (0 = sem rede)
    useEffect(() => {
        const ouvir = (e) => setErro(e.detail);
        window.addEventListener('api-erro', ouvir);
        return () => window.removeEventListener('api-erro', ouvir);
    }, [])
    const [modal, setModal]=useState(false);
    const [url, setUrl]=useState("");
    const [filmesTendenciasSemana, setfilmesTendenciasSemana]=useState([]);
    const [filmesTendenciasDia, setfilmesTendenciasDia]=useState([]);
    const [filmesBrevemente, setfilmesBrevemente]=useState([]);
    const [tendencia, setTendencia]=useState(false);
    // a classe inicial é posta no <body> pelo script do index.html
    const [theme, setTheme]=useState(()=>document.body.classList.contains("light") ? "light" : "dark");
    useEffect(() => {
        document.body.classList.toggle("light", theme==="light");
        document.body.classList.toggle("dark", theme!=="light");
        document.querySelector('meta[name="theme-color"]').content = theme==="light" ? "#f3f4f6" : "#0a0a0b";
    }, [theme])
    useEffect(() => {
        setSelectIdioma(getIdioma(idioma).toUpperCase());
        const language=getIdioma(idioma)==="en" ? US:
                        getIdioma(idioma)==="pt" ? PT:PT

        const getTendencias = async (url)=> {
             const data= await Promise.all([
                axios.get(url.tendenciasPT),
                axios.get(url.filmesDiscover),
                axios.get(url.tvDiscover),
                axios.get(url.generosFilmes),
                axios.get(url.pessoasTrending),
                axios.get(url.filmesTendenciasSemana),
                axios.get(url.filmesTendenciasDia),
                axios.get(url.filmesBrevemente),
                axios.get(url.filmesTop)
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
        getTendencias(language).catch(() => {}); // o erro já foi comunicado pelo interceptor do axios
    }, [])
    
    return (
        <StateContext.Provider
            value={{erro, setErro, theme, setTheme,tendencia, setTendencia,TopMovie,filmesBrevemente,filmesTendenciasDia,filmesTendenciasSemana,url, setUrl,modal, setModal, i18n,loading,setLoading,pessoasTrending,tendencias,filmesdiscover,tvDiscover,genrsMovie,selectIdioma, setSelectIdioma }}>
            {children}
        </StateContext.Provider>
    );
};

export const useApiContext = () => useContext(StateContext);
