import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from '../api'
const I18N_STORAGE_KEY = 'i18nextLng';
const Detalhe = () => {
    const params = useParams();
    const [filme, setFilme]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        const idioma= localStorage.getItem(I18N_STORAGE_KEY);
        async function getFilmes() {
            const f= await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&append_to_response=videos,images,reviews,credits,similar`);
            setFilme(f.data)
            setLoading(true);
        }
        getFilmes()
    },[])
    return (
        loading===true ? 
        <>
            <p>{filme.title}</p>
        </>:
        <></>
    )
}

export default Detalhe
