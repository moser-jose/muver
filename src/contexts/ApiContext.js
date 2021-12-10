import React, { createContext,useEffect, useState, useContext } from 'react';
import axios from '../api';
import {PT,US,FR} from '../api/url';
import { i18n } from '../translate/i18n'
export const StateContext = createContext();

export const ApiContext = ({ children }) => {
    const [selectIdioma, setSelectIdioma]=useState("PT");
    const [tendencias, setTendencias]=useState([]);
    const [filmesdiscover, setFilmesDiscover]=useState([]);
    const [tvDiscover, setTvDiscover]=useState([]);
    const [genrsMovie, setGenrsMovie]=useState([]);
    const [pessoasTrending, setPessoasTreding]=useState([]);
    const [loading,setLoading ]=useState(false)
    const [modal, setModal]=useState(false);
    const [url, setUrl]=useState("");
    const [filmesTendencias, setfilmesTendencias]=useState([]);
    const [filmesBrevemente, setfilmesBrevemente]=useState([]);
    useEffect(() => {
        function getIdioma(){
            const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
            if(idioma==="pt-PT"){
                setSelectIdioma("PT")
            }
            else if(idioma==="en-US"){
                setSelectIdioma("EN")
            }
            else if(idioma==="fr-FR"){
                setSelectIdioma("FR")
            }
            else{
                setSelectIdioma("PT")
            }
            return idioma;
        }
        async function getTendencias(url) {
            const t= await axios.get(url.tendenciasPT);
            const d= await axios.get(url.filmesDiscover);
            const tv= await axios.get(url.tvDiscover);
            const gM= await axios.get(url.generosFilmes);
            const pt= await axios.get(url.pessoasTrending);
            const ftendenci= await axios.get(url.filmesTendencias);
            const breve= await axios.get(url.filmesBrevemente);
            setfilmesBrevemente(breve);
            setTendencias(t.data.results);
            setFilmesDiscover(d.data.results);
            setTvDiscover(tv.data.results);
            setGenrsMovie(gM.data.genres);
            setPessoasTreding(pt.data.results);
            setfilmesTendencias(ftendenci.data.results);
            setLoading(true);
        }
        
        getTendencias(
            getIdioma()==="pt-PT" ? PT:
            getIdioma()==="en-US" ? US:
            getIdioma()==="fr-FR" ? FR: PT
            );
        getIdioma();
    }, [])
    
    return (
        <StateContext.Provider
            value={{filmesBrevemente,filmesTendencias,url, setUrl,modal, setModal, i18n,loading,setLoading,pessoasTrending,tendencias,filmesdiscover,tvDiscover,genrsMovie,selectIdioma, setSelectIdioma }}>
            {children}
        </StateContext.Provider>
    );
};

export const useApiContext = () => useContext(StateContext);
