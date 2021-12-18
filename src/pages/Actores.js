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
const idioma= localStorage.getItem(process.env.REACT_APP_I18N_STORAGE_KEY);
const Actores = () => {
    const [data, setData]=useState([]);
    const [page, setPage]=useState(1);
    const [loading, setLoading]=useState(1);
    useEffect(()=>{
        async function getActores() {
            const data= await axios.get(`${process.env.REACT_APP_APP_URL}/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&language=${idioma}&include_adult=false&page=${page}`);
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
                        <h2 className="_p">Actores</h2>
                    </div>
                </div>
            </div>
            <div className="todos-actores">
                <div className="titulo">
                    <p>Actores</p>
                </div>
                <div className="todos" id="actores">
                    {
                        data.results.map((item, key)=>(
                            <a key={key} href={`/actores/${slugify(item.name,{lower:true,strict: true})}/${item.id}`} className="todos-a">
                            <img src={
                                 item.profile_path===null && item.gender===0 ? userMale: 
                                 item.profile_path===null && item.gender===1 ? userFemale:
                                 item.profile_path===null && item.gender===2 ? userMale:
                                 `https://image.tmdb.org/t/p/w300${item.profile_path}`}/>
                            <h3>{item.name}</h3>
                        </a>
                        ))
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

export default Actores