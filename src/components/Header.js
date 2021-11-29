import React from 'react'
import { Moon, NotificationBing, Sun1 } from 'iconsax-react'
import Logo from '../assets/img/muver.svg'
import { SlideHeader } from './SlideHeader'
const Header = () => {
    return (
        <>
        <div className="header">
            <div className="logo">
                <a href="/">
                    <img src={Logo}></img>
                </a>
            </div>
            <div className="menu">
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Series</a></li>
                        <li><a href="/">Filmes</a></li>
                        <li><a href="/">Pessoas</a></li>
                    </ul>
                </nav>
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
                <div className="idioma">
                    <span className="pt">PT</span>
                </div>
                <NotificationBing size="20" color="#ffffff" variant="Bulk"/>
                <div className="login">
                    <a href="/" >Entrar</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header
