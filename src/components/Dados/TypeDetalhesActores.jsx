import { t } from '../../translate/i18n'
import { Star, UserOctagon } from 'iconsax-react';
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {getIdioma} from '../../functions'
import axios from '../../api'
import Header from '../Header'
import OpenSource from '../OpenSource'
import { DataAll } from './DataAll'
import Loading from '../Loading';
const idioma= localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);
const TypeDetalhesActores = () => {
    const params = useParams();
    const [actor, setActor]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        async function getFilmes() {
            const f= await axios.get(`${import.meta.env.REACT_APP_APP_URL}/person/${params.id}?api_key=${import.meta.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=images,credits&include_image_language=null,${getIdioma(idioma)}`);
            setActor(f.data);
            setLoading(true);
        }
        getFilmes()
    },[])
    return (
        loading===true ? <div className='simi-detalhe'>
        <OpenSource/>
        <Header/>
        <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/w1280${actor.profile_path} )`}}>
           <div className="pr">
               <div className="data">
                    {
                       <h2 className="title"><UserOctagon size="32" color="#fff" variant="Bulk"/> {actor.name}</h2>
                    }
                   
                   <h2 className="_p">{
                    params.type==="filmes" && t('ui.filmes_realizados')                    
                   }</h2>
               </div>
           </div>
        </div>
        <div className="todos-actores">
                <div className="titulo">
                    {
                        actor.gender===1?<p>{t('ui.filmes_actriz')}</p>:
                        <p>{t('ui.filmes_actor')}</p>
                    }
                </div>
                <div className="filmeR simil" >
                {
                    actor.credits.cast.map((item, key)=>{
                            return <DataAll key={key} item={item} type="filme"/>
                            
                    })
                }
                </div>
                <div className="titulo" style={{marginTop:'30px'}}>
                    <p>{t('ui.equipa_tecnica')}</p>
                </div>
                <div className="filmeR simil" >
                {
                    actor.credits.crew.map((item, key)=>{
                            return <DataAll key={key} item={item} type="filme"/>
                    })
                }
                </div>
        </div>
   </div>:<Loading/>
    )
}

export default TypeDetalhesActores
