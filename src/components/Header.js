import React, { useEffect, useState } from 'react'
import { Moon, NotificationBing, SearchNormal, Sun1 } from 'iconsax-react'
import Logo from '../assets/img/muver.svg'
import PT from '../assets/img/pt.png'
import US from '../assets/img/us.png'
import FR from '../assets/img/fr.png'
import {useApiContext} from '../contexts/ApiContext'
import { Link } from 'react-router-dom'
const Header = () => {
    const {i18n,theme,setTheme}=useApiContext();
    const [clickIdioma, setClickIdioma]=useState(false);
    const {selectIdioma, setSelectIdioma}=useApiContext();
    const [themeButton, setThemeButton] = useState(true);
    const [menu, setMenu]=useState(false);
    
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
        else{
            localStorage.setItem(process.env.REACT_APP_I18N_STORAGE_KEY,"pt-PT");
        }
        setSelectIdioma(idioma)
        window.location = window.location
    }
    const handleTheme=()=>{
        if (theme==="light") {
            document.querySelector('body').classList.remove('light');
            localStorage.setItem(process.env.REACT_APP_THEME,"dark");
            setTheme("dark")
        }
        else {
            document.querySelector('body').classList.add('light');
            localStorage.setItem(process.env.REACT_APP_THEME,"light");
            setTheme("light")
        }
       
    }
    useEffect(() => {
        if(theme ==="light")
            document.querySelector('body').classList.add('light');
        else
            document.querySelector('body').classList.add('dark');
        
    }, [])
    console.log(menu)
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
                            <li><Link to="/actores">{i18n.t('header.actores')}</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className='search' title='Pesquisar'>
                    <SearchNormal  className='serc' size="22" color="#fff" variant="Bulk"/>
                </div>
                
                <div className="user">
                    <div className="theme">
                        <input onClick={handleTheme} type="checkbox" className="checkbox" id="chk" />
                        <label className="label" htmlFor="chk">
                            <Moon size="11" color="#000" variant="Bulk"/>
                            <Sun1 size="11" color="#ad6d08" variant="Bulk"/>
                            <div className={theme === "dark" ? "ball dark  " : "ball light"}></div>
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
                            </ul>
                        </div>
                        }
                    </div>
                    <NotificationBing size="22" color="#ffffff" variant="Bulk"/>
                    <div className="login">
                        <a href="/" >{i18n.t('header.login')}</a>
                    </div>
                </div>
                <div className={menu ===true ? 'hamb men':'hamb'} onClick={()=>setMenu(!menu)}>
                    <span className='bar1'></span>
                    <span className='bar2'></span>
                </div>
            </div>
    )
}

export default Header
