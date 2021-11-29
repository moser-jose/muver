import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import { Slide } from 'react-slideshow-image';
import { useVideoContext } from '../contexts/ApiContext'; 
import { Profile, Ranking, Star } from 'iconsax-react';
const properties = {
    indicators: true,
    arrows:false,
    autoplay:false
  };

const Home = () => {
    const {tendencias}=useVideoContext();
    const [tenIm, setTendIm]=useState(tendencias);
    const [loading, setLoading]=useState(false);
    useEffect(() => {
        async function Pegar(){
            await tendencias.slice(0,5).map((item) => {
                setTendIm(item)
                setLoading(true)
                return item
            });
        }
        Pegar()
    }, [tendencias])
    return (
        <>
        {
            loading===true ? 
            <div className="container">
                <div className="home">
                <Header/>
                    <Slide easing="ease" {...properties}>
                        <div className="each-slide">
                            <div style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${tendencias[0].backdrop_path})`}}>
                            
                                <div className="pr">
                                    {
                                        tendencias[0].media_type==="tv" ?
                                        <>
                                            <span className="media-type">{tendencias[0].media_type}</span>
                                            <p className="titulo">{tendencias[0].name}</p>
                                            <div className="meida">
                                            <h5 className="original">{tendencias[0].original_name}</h5>
                                                <span>
                                                    <Star size="24" color="#cccc32" variant="Bulk"/>
                                                    {tendencias[0].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[0].overview}</p>
                                        </>:
                                        <>
                                            <span className="media-type">{tendencias[0].media_type}</span>
                                            <p className="titulo">{tendencias[0].title}</p>
                                            
                                            <div className="media">
                                                <h5 className="original">{tendencias[0].original_title}</h5>
                                                <span>
                                                    <Star size="24" color="#cccc32" variant="Bulk"/>
                                                    {tendencias[0].vote_average}/10
                                                </span>
                                                <span>
                                                    
                                                    <Profile size="24" color="#000" variant="Bulk"/>
                                                    {tendencias[0].vote_count}
                                                </span>
                                                
                                            </div>
                                            <p className="texto">{tendencias[0].overview}</p>
                                        </>
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="each-slide">
                        <div style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${tendencias[1].backdrop_path})`}}>
                        <div className="pr">
                        {
                                        tendencias[1].media_type==="tv" ?
                                        <>
                                            <span className="media-type">{tendencias[1].media_type}</span>
                                            <p className="titulo">{tendencias[1].name}</p>
                                            <div className="media">
                                            <h5 className="original">{tendencias[1].original_name}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[1].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[1].overview}</p>
                                        </>:
                                        <>
                                            <span className="media-type">{tendencias[1].media_type}</span>
                                            <p className="titulo">{tendencias[1].title}</p>
                                            <div className="media">
                                                <h5 className="original">{tendencias[1].original_title}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[1].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[1].overview}</p>
                                        </>
                                    }
                                </div>
                            
                        </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${tendencias[2].backdrop_path})`}}>
                                
                            <div className="pr">
                            {
                                        tendencias[2].media_type==="tv" ?
                                        <>
                                            <span className="media-type">{tendencias[2].media_type}</span>
                                            <p className="titulo">{tendencias[2].name}</p>
                                            <div className="media">
                                            <h5 className="original">{tendencias[2].original_name}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[2].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[2].overview}</p>
                                        </>:
                                        <>
                                            <span className="media-type">{tendencias[2].media_type}</span>
                                            <p className="titulo">{tendencias[2].title}</p>
                                            <div className="media">
                                                <h5 className="original">{tendencias[2].original_title}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[2].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[2].overview}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${tendencias[3].backdrop_path})`}}>
                                
                            <div className="pr">
                            {
                                        tendencias[3].media_type==="tv" ?
                                        <>
                                            <span className="media-type">{tendencias[3].media_type}</span>
                                            <p className="titulo">{tendencias[3].name}</p>
                                            <div className="media">
                                            <h5 className="original">{tendencias[3].original_name}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[3].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[3].overview}</p>
                                        </>:
                                        <>
                                            <span className="media-type">{tendencias[3].media_type}</span>
                                            <p className="titulo">{tendencias[3].title}</p>
                                            <div className="media">
                                                <h5 className="original">{tendencias[3].original_title}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[3].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[3].overview}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'background': `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.2)),url(https://image.tmdb.org/t/p/original${tendencias[4].backdrop_path})`}}>
                                
                            <div className="pr">
                            {
                                        tendencias[4].media_type==="tv" ?
                                        <>
                                            <span className="media-type">{tendencias[4].media_type}</span>
                                            <p className="titulo">{tendencias[4].name}</p>
                                            
                                            <div className="media">
                                            <h5 className="original">{tendencias[4].original_name}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[4].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[4].overview}</p>
                                        </>:
                                        <>
                                            <span className="media-type">{tendencias[4].media_type}</span>
                                            <p className="titulo">{tendencias[4].title}</p>
                                            <div className="media">
                                                <h5 className="original">{tendencias[4].original_title}</h5>
                                                <span>
                                                    <Star size="24" color="#ad6a10" variant="Bulk"/>
                                                    {tendencias[4].vote_average}/10
                                                </span>
                                            </div>
                                            <p className="texto">{tendencias[4].overview}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </Slide>
                </div>
            </div>:
            <></>
        }
            
        </>
    )
}

export default Home
