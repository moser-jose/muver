import { t } from '../translate/i18n'
import React, { useState } from 'react'
import { Moon, NotificationBing, SearchNormal, Sun1 } from 'iconsax-react'
import Logo from '../assets/img/muver.svg'
import PT from '../assets/img/pt.png'
import US from '../assets/img/us.png'
import FR from '../assets/img/fr.png'
import {useApiContext} from '../contexts/ApiContext'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
const Header = () => {
    const {i18n,theme,setTheme}=useApiContext();
    const [clickIdioma, setClickIdioma]=useState(false);
    const {selectIdioma, setSelectIdioma}=useApiContext();
    const [menu, setMenu]=useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {q} = useParams(); // só existe na página de pesquisa
    const [busca, setBusca]=useState(q || '');
    // página onde a pessoa estava antes de pesquisar; mantém-se entre pesquisas seguidas
    const origem = q ? (location.state?.de || '/') : location.pathname;
    const pesquisar=(e)=>{
        e.preventDefault();
        const termo = busca.trim();
        if(termo) navigate(`/pesquisa/${encodeURIComponent(termo)}`, {state: {de: origem}});
    }
    const limpar=()=>{
        setBusca('');
        if(q) navigate(origem);
    }
    
    const handleClick=()=>{
        setClickIdioma(!clickIdioma);
    }
    const handleClickIdioma=(idioma)=>{
        if(idioma==="PT"){
            localStorage.setItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY,"pt-PT");
        }
        else if(idioma==="EN"){
            localStorage.setItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY,"en-US");
        }
        else{
            localStorage.setItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY,"pt-PT");
        }
        setSelectIdioma(idioma)
        window.location = window.location
    }
    const handleTheme=()=>{
        const novo = theme==="light" ? "dark" : "light";
        localStorage.setItem(import.meta.env.REACT_APP_THEME, novo);
        setTheme(novo);
    }
    return (
            <div className={menu ? "header aberto" : "header"}>
                <div className="logo">
                    <a href="/">
                        <img src={Logo} alt="Muver"/>
                    </a>
                </div>
                <div className="menu" onClick={()=>setMenu(false)}>
                    <nav>
                        <ul>
                            {/* <li><a href="/">Home</a></li> */}
                            <li><Link to="/filmes">{i18n.t('header.filme')}</Link></li>
                            <li><Link to="/series">{i18n.t('header.series')}</Link></li>
                            <li><Link to="/actores">{i18n.t('header.actores')}</Link></li>
                        </ul>
                    </nav>
                </div>
                <form className='search' role="search" onSubmit={pesquisar}>
                    <input type="search" value={busca} onChange={(e)=>setBusca(e.target.value)} placeholder={i18n.t('header.pesquisar')} aria-label={i18n.t('header.pesquisar')}/>
                    {busca && <button type="button" className="limpar" onClick={limpar} aria-label={i18n.t('header.limpar')}>×</button>}
                    <button type="submit" aria-label={i18n.t('header.pesquisar')}>
                        <SearchNormal size="20" color="#fff" variant="Bulk"/>
                    </button>
                </form>

                <div className="user">
                    <div className="theme">
                        <input onChange={handleTheme} checked={theme==="light"} aria-label={t('ui.tema_claro')} type="checkbox" className="checkbox" id="chk" />
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
                <button type="button" aria-label="Menu" aria-expanded={menu} className={menu ===true ? 'hamb men':'hamb'} onClick={()=>setMenu(!menu)}>
                    <span className='bar1'></span>
                    <span className='bar2'></span>
                </button>
            </div>
    )
}

export default Header
