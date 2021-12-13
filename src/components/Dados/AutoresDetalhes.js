import React, { useEffect, useState } from 'react'
import Header from '../Header'
import axios from '../../api'
import { useParams,useNavigate } from 'react-router-dom';
import OpenSource from '../OpenSource';
import userMale from '../../assets/img/user-act.jpg'
import userFemale from '../../assets/img/user-act-f.jpg'
import { Play } from 'iconsax-react';
var slugify = require('slugify')
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const AutoresDetalhes = () => {
    const params = useParams();
    const navigate=useNavigate();
    const [filme, setFilme]=useState([]);
    const [crew, setCrew]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        async function getFilmes() {
            let id="pt"
            if(idioma==="en-US"){
                id="en"
            }
            else if(idioma==="fr-FR"){
                id="fr"
            }
            else{
                id="pt"
            }
            const f= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=videos,images,reviews,credits,similar,keywords&include_image_language=null,${id}`);
            setFilme(f.data);
            function groupBy(list, keyGetter) {
                const map = new Map();
                list.forEach((item) => {
                     const key = keyGetter(item);
                     const collection = map.get(key);
                     if (!collection) {
                         map.set(key, [item]);
                     } else {
                         collection.push(item);
                     }
                });
                return map;
            }
            setCrew(groupBy(f.data.credits.crew, act => act.name))
            setLoading(true);
        }
        getFilmes()
    },[])
    return (
        loading===true ? 
        <div className="autores-detalhes">
            <OpenSource/>
            <Header/>
            <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/original${filme.backdrop_path} )`}}>
                <div className="pr">
                    <div className="data">
                        <h2 className="title" onClick={()=>navigate(-1)}><Play size="32" color="#fff" variant="Bulk"/> {filme.title}</h2>
                        <h2 className="_p">Actores e Equipe Técnica</h2>
                    </div>
                </div>
            </div>
            <div className="todos-actores">
                <div className="titulo">
                    <p>Actores</p>
                </div>
                <div className="todos" id="actores">
                    {
                        filme.credits.cast.map((item, key)=>(
                            <a key={key} href={`/actores/${slugify(item.name,{lower:true,strict: true})}/${item.id}`} className="todos-a">
                            <img src={
                                 item.profile_path===null && item.gender===0 ? userMale: 
                                 item.profile_path===null && item.gender===1 ? userFemale:
                                 item.profile_path===null && item.gender===2 ? userMale:
                                 `https://image.tmdb.org/t/p/w300${item.profile_path}`}/>
                            <h3>{item.name}</h3>
                            <h4><span>como</span> {item.character}</h4>
                        </a>
                        ))
                    }
                </div>
            </div>
            <div className="todos-actores">
                <div className="titulo">
                    <p>Equipe Técnica</p>
                </div>
                <div className="todos" id="equipe">
                    {
                        Array.from(crew).map((i, key)=>{
                            return <a key={key} href={`/actores/${slugify(i[1][0].name,{lower:true,strict: true})}/${i[1][0].id}`} className="todos-a">
                            <img src={
                                i[1][0].profile_path===null && i[1][0].gender===0 ? userMale: 
                                i[1][0].profile_path===null && i[1][0].gender===1 ? userFemale:
                                i[1][0].profile_path===null && i[1][0].gender===2 ? userMale:
                                `https://image.tmdb.org/t/p/w300${i[1][0].profile_path}`}/>
                            <h3>{i[1][0].name}</h3>
                            <h4>
                                {i[1].map((j,k)=>{
                                    return <span key={k}>{j.job}</span>
                                })}
                            </h4>
                        </a>
                        }) 
                    }
                </div>
            </div>
        </div>:<></>
    )
}

export default AutoresDetalhes
