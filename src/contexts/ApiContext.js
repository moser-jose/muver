import React, { createContext,useEffect, useState, useContext } from 'react';
import axios from '../api';

export const StateContext = createContext();

export const StateVideoContext = ({ children }) => {
    const [tendencias, setTendencias]=useState([]);
    //url.tendenciasPT

   
    useEffect(() => {
        async function getTendencias(url) {
            const data= await axios.get(url);
            setTendencias(data.data.results);
            /* console.log(data); */
            return data;
        }
       getTendencias();
    }, [])
    
    return (
        <StateContext.Provider
            value={{  }}>
            {children}
        </StateContext.Provider>
    );
};

export const useVideoContext = () => useContext(StateContext);
