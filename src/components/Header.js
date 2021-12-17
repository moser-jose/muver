import React, { useEffect, useState } from 'react'
import { Moon, NotificationBing, SearchNormal, Sun1 } from 'iconsax-react'
import Logo from '../assets/img/muver.svg'
import { SlideHeader } from './SlideHeader'
import PT from '../assets/img/pt.png'
import US from '../assets/img/us.png'
import FR from '../assets/img/fr.png'
import {useApiContext} from '../contexts/ApiContext'
import { Link } from 'react-router-dom'
const Header = () => {
    const {i18n}=useApiContext();
    const [clickIdioma, setClickIdioma]=useState(false);
    const {selectIdioma, setSelectIdioma}=useApiContext();
    const handleClick=()=>{
        setClickIdioma(!clickIdioma);
    }
    const handleClickIdioma=(idioma)=>{
        if(idioma==="PT"){
            localStorage.setItem(process.env.REACT_APP_I18N_STORAGE_KEY,"pt-PT");
        }
        else if(idioma==="EN"){
            localStorage.setItem(process.env.REACT_APP_I18N_STORAGE_KEY,"en-US");
        }
        else if(idioma==="FR"){
            localStorage.setItem(process.env.REACT_APP_I18N_STORAGE_KEY,"fr-FR");
        }
        else{
            localStorage.setItem(process.env.REACT_APP_I18N_STORAGE_KEY,"pt-PT");
        }
        setSelectIdioma(idioma)
        window.location = window.location
    }
    return (
            <div className="header">
                <div className="logo">
                    <a href="/">
                        <img src={Logo}></img>
                    </a>
                </div>
                <div className="menu">
                    <nav>
                        <ul>
                            {/* <li><a href="/">Home</a></li> */}
                            <li><Link to="/filmes">{i18n.t('header.filme')}</Link></li>
                            <li><Link to="/series">{i18n.t('header.series')}</Link></li>
                            <li><Link to="/">{i18n.t('header.actores')}</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className='search' title='Pesquisar'>
                    <SearchNormal  className='serc' size="22" color="#fff" variant="Bulk"/>
                </div>
                <div className="user">
                    <div className="theme">
                        <input type="checkbox" className="checkbox" id="chk" />
                        <label className="label" htmlFor="chk">
                            <Sun1 size="11" color="#ad6d08" variant="Bulk"/>
                            <Moon size="11" color="#000" variant="Bulk"/>
                            <div className="ball"></div>
                        </label>
                    </div>
                    <div className="idioma" onClick={handleClick}>
                        <span className="pt">
                            {selectIdioma}
                        </span>
                        {
                            clickIdioma===true && 
                            <div className="listaI">
                            <ul>
                                <li onClick={()=>handleClickIdioma("PT")}><span>{i18n.t('header.pt')}</span> <img src={PT} alt="Português"></img> </li>
                                <li onClick={()=>handleClickIdioma("EN")}><span>{i18n.t('header.en')}</span> <img src={US} alt="Inglês"></img></li>
                                <li onClick={()=>handleClickIdioma("FR")}><span>{i18n.t('header.fr')}</span> <img src={FR} alt="Francês"></img></li>
                            
                            </ul>
                        </div>
                        }
                    </div>
                    <NotificationBing size="22" color="#ffffff" variant="Bulk"/>
                    <div className="login">
                        <a href="/" >{i18n.t('header.login')}</a>
                    </div>
                </div>
            </div>
    )
}

export default Header
