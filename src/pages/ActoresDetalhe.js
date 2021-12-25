import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from '../api'
import { useParams } from 'react-router-dom';
import OpenSource from '../components/OpenSource';
import { Cake, ProfileDelete, UserOctagon } from 'iconsax-react';
import { limita } from '../functions';
var slugify = require('slugify')
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const ActoresDetalhe = () => {
    const params = useParams();
    const [actor, setActor]=useState([]);
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
            const f= await axios.get(`${process.env.REACT_APP_APP_URL}/person/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=videos,images,reviews,credits,similar,keywords&include_image_language=null,${id}`);
            setActor(f.data);
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
            <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/original${actor.profile_path} )`,'height':'100vh'}}>
                <div className="pr">
                    <div className="data">
                        <h2 className="_p">{actor.name}</h2>
                        <div className="mediaT">
                            <span className="media-type-t"><Cake size="18" color="#fff" variant="Bulk"/> {actor.birthday}</span>
                            {
                                actor.deathday!==null &&
                                <span className="media-type-t"><ProfileDelete size="18" color="#fff" variant="Bulk"/> {actor.deathday}</span>
                            }
                        </div>
                        <p className='biograf'>{limita(actor.biography,320)}...</p>
                        <div className="mediaT">
                            <p className="birth">{actor.place_of_birth}</p>
                            <span className="popul"><UserOctagon size="26" color="#fff " variant="Bulk"/>{actor.popularity}</span>
                        </div>
                        {actor.also_known_as.slice(0,5).map((item, key)=>{
                            return <span key={key} href="/"className="ver gen">{item}</span>
                        })}
                        
                    </div>

                    <div className="img">
                                <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}/>
                            </div>
                </div>
            </div>{/* 
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
            </div> */}
        </div>:<></>
    )
}

export default ActoresDetalhe
