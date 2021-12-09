import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../api'
import Actor from '../components/Actor';
import Collection from '../components/Collection';
import Galery from '../components/Galery';
import Images from '../components/Images';
import Row from '../components/Row';
import Similar from '../components/Similar';
import { SlideDetalhe } from '../components/SlideDetalhe';
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const Detalhe = () => {
    const params = useParams();
    const [filme, setFilme]=useState([]);
    const [certificacao, setCertificacao]=useState([]);
    const [colection, setColection]=useState([]);
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
            const cert= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/${params.id}/release_dates?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`);
            setFilme(f.data);
            
            if(f.data.belongs_to_collection!==null){
               const col= await axios.get(`${process.env.REACT_APP_APP_URL}/collection/${f.data.belongs_to_collection.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&append_to_response=videos,images,reviews,credits,similar,keywords&include_image_language=null,${id}`);
                setColection(col)
            }
            cert.data.results.filter((item)=>{
                if(idioma==="pt-PT")
                {
                    if(item.iso_3166_1==="PT"){
                        item.release_dates.slice(0,1).filter((el)=>{
                            if(el.type === 3 && el.certification!==""
                                        && el.certification!=="M18"
                                        && el.certification!=="18+"
                                        && el.certification!=="M/18"
                                        && el.certification!=="K-18"
                                        && el.certification!=="R18+"
                                        && el.certification!=="X18+"
                                        && el.certification!=="18"
                                        && el.certification!=="18SX"
                                        && el.certification!=="R-18"
                                        && el.certification!=="N-18"
                                        && el.certification!=="X")
                            {setCertificacao(el)}
                            else{
                                item.release_dates.filter((el)=>{
                                    if(el.type === 3 
                                        && el.certification!==""
                                        && el.certification!=="M18"
                                        && el.certification!=="18+"
                                        && el.certification!=="M/18"
                                        && el.certification!=="K-18"
                                        && el.certification!=="R18+"
                                        && el.certification!=="X18+"
                                        && el.certification!=="18"
                                        && el.certification!=="18SX"
                                        && el.certification!=="R-18"
                                        && el.certification!=="N-18"
                                        && el.certification!=="X"                                        
                                         )
                                    setCertificacao(el)
                                })
                            }
                        })
                    }
                    else{
                        item.release_dates.slice(0,1).filter((el)=>{
                            if(el.certification!==""
                            && el.certification!=="M18"
                            && el.certification!=="18+"
                            && el.certification!=="M/18"
                            && el.certification!=="K-18"
                            && el.certification!=="R18+"
                            && el.certification!=="X18+"
                            && el.certification!=="18"
                            && el.certification!=="18SX"
                            && el.certification!=="R-18"
                            && el.certification!=="N-18"
                            && el.certification!=="X")
                            setCertificacao(el)
                        })
                    }
                }
                else if(idioma==="en-US"){
                    if(item.iso_3166_1==="US"){
                        item.release_dates.slice(0,1).filter((el)=>{
                            if(el.type === 3 && el.certification!==""
                                        && el.certification!=="M18"
                                        && el.certification!=="18+"
                                        && el.certification!=="M/18"
                                        && el.certification!=="K-18"
                                        && el.certification!=="R18+"
                                        && el.certification!=="X18+"
                                        && el.certification!=="18"
                                        && el.certification!=="18SX"
                                        && el.certification!=="R-18"
                                        && el.certification!=="N-18"
                                        && el.certification!=="X")
                            {setCertificacao(el)}
                            else{
                                item.release_dates.filter((el)=>{
                                    if(el.type === 3 
                                        && el.certification!==""
                                        && el.certification!=="M18"
                                        && el.certification!=="18+"
                                        && el.certification!=="M/18"
                                        && el.certification!=="K-18"
                                        && el.certification!=="R18+"
                                        && el.certification!=="X18+"
                                        && el.certification!=="18"
                                        && el.certification!=="18SX"
                                        && el.certification!=="R-18"
                                        && el.certification!=="N-18"
                                        && el.certification!=="X"                                        
                                         )
                                    setCertificacao(el)
                                })
                            }
                        })
                    }
                    else{
                        item.release_dates.slice(0,1).filter((el)=>{
                            if(el.certification!==""
                            && el.certification!=="M18"
                            && el.certification!=="18+"
                            && el.certification!=="M/18"
                            && el.certification!=="K-18"
                            && el.certification!=="R18+"
                            && el.certification!=="X18+"
                            && el.certification!=="18"
                            && el.certification!=="18SX"
                            && el.certification!=="R-18"
                            && el.certification!=="N-18"
                            && el.certification!=="X")
                            setCertificacao(el)
                        })
                    }
                }
                else if(idioma==="fr-FR"){
                    if(item.iso_3166_1==="FR"){
                        item.release_dates.slice(0,1).filter((el)=>{
                            if(el.type === 3 && el.certification!==""
                                        && el.certification!=="M18"
                                        && el.certification!=="18+"
                                        && el.certification!=="M/18"
                                        && el.certification!=="K-18"
                                        && el.certification!=="R18+"
                                        && el.certification!=="X18+"
                                        && el.certification!=="18"
                                        && el.certification!=="18SX"
                                        && el.certification!=="R-18"
                                        && el.certification!=="N-18"
                                        && el.certification!=="X")
                            {setCertificacao(el)}
                            else{
                                item.release_dates.filter((el)=>{
                                    if(el.type === 3 
                                        && el.certification!==""
                                        && el.certification!=="M18"
                                        && el.certification!=="18+"
                                        && el.certification!=="M/18"
                                        && el.certification!=="K-18"
                                        && el.certification!=="R18+"
                                        && el.certification!=="X18+"
                                        && el.certification!=="18"
                                        && el.certification!=="18SX"
                                        && el.certification!=="R-18"
                                        && el.certification!=="N-18"
                                        && el.certification!=="X"                                        
                                         )
                                    setCertificacao(el)
                                })
                            }
                        })
                    }
                    else{
                        item.release_dates.slice(0,1).filter((el)=>{
                            if(el.certification!==""
                            && el.certification!=="M18"
                            && el.certification!=="18+"
                            && el.certification!=="M/18"
                            && el.certification!=="K-18"
                            && el.certification!=="R18+"
                            && el.certification!=="X18+"
                            && el.certification!=="18"
                            && el.certification!=="18SX"
                            && el.certification!=="R-18"
                            && el.certification!=="N-18"
                            && el.certification!=="X")
                            setCertificacao(el)
                        })
                    }
                }
            })
            setLoading(true);
        }
        getFilmes()
    },[]) 
    return (
        loading===true ? 
        <>
            <SlideDetalhe certificacao={certificacao} data={filme} type="filme" />
            <Actor data={filme.credits} titulo="Actores" type="actores"/>
            <Actor data={filme.credits} titulo="Equipe técnica" type="equipe"/>
            {
                filme.belongs_to_collection && <Collection colection={colection} poster={filme.poster_path} back={filme.backdrop_path} data={filme.belongs_to_collection}/>
            }            
            <Galery vid={filme.videos} data={filme.images}/>
            <Similar data={filme.similar.results} type="filme" title="Os Filmes similares"/>
        </>:
        <></>
    )
}

export default Detalhe
