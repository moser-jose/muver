import React, { createContext,useEffect, useState, useContext } from 'react';
import axios from '../api';
import url from '../api/url';
export const StateContext = createContext();

export const StateVideoContext = ({ children }) => {
    const [tendencias, setTendencias]=useState([]);

    useEffect(() => {
       async function getTendencias() {
           const data= await axios.get(url.tendenciasPT);
           setTendencias(data.data.results);
           /* console.log(data); */
           return data;
       }
       getTendencias();
    }, [])
    
    return (
        <StateContext.Provider
            value={{ tendencias }}>
            {children}
        </StateContext.Provider>
    );
};

export const useVideoContext = () => useContext(StateContext);
