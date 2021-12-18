import React, { useEffect, useState } from 'react'
import axios from '../api'
import Header from '../components/Header';
import OpenSource from '../components/OpenSource';
import userMale from '../assets/img/user-act.jpg'
import userFemale from '../assets/img/user-act-f.jpg'
import slugify from 'slugify';
import ReactPaginate from 'react-paginate';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Loading from '../components/Loading';
import { DataAll } from '../components/Dados/DataAll';
import { useParams } from 'react-router-dom';
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);

const FilmesPage = () => {
    const [data, setData]=useState([]);
    const [page, setPage]=useState(1);
    const [loading, setLoading]=useState(1);
    const params=useParams();
    useEffect(()=>{
        async function getActores() {
            const data= await axios.get(`${process.env.REACT_APP_APP_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`);
            setData(data.data)
            setLoading(true);
        }
        getActores()
    },[page])

    const handlePageClick=(e)=>{
        if(e.selected===0){
            setPage(1)
        }
        else{
            setPage(e.selected+1)
        }
        
    }
    return (
        loading===true ? 
        <div className='autores-detalhes'>
            <OpenSource/>
            <Header/>
            <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.4),rgba(24, 24, 24, 0.3)),url(https://image.tmdb.org/t/p/original${data.results[0].profile_path} )`}}>
                <div className="pr">
                    <div className="data">
                        {
                            params.slug==="mais-populares"? <h2 className="_p">Filmes mais populares</h2>:<></>
                        }
                        
                    </div>
                </div>
            </div>
            <div className="todos-actores">
                <div className="titulo">
                    <p>Filmes</p>
                </div>
                <div className="todos" id="actores">
                    {
                        data.results.map((item, key)=>{
                            return <DataAll key={key} item={item} type="filmes"/>
                        })
                    }
                </div>

                <ReactPaginate
                    previousLabel={<ArrowLeft2 size="18" color="#fff" variant="Outline"/>}
                    nextLabel={<ArrowRight2 size="18" color="#fff" variant="Outline"/>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={data.total_pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>:<Loading/>
    )
}

export default FilmesPage