import { t } from '../translate/i18n'
import React from 'react'
import Logo from '../assets/img/muver.svg'

// Rodapé do site (fica fora do Router, por isso usa <a> e não <Link>)
const Github = () => {
    return (
        <footer className='rodape'>
            <div className='rodape-topo'>
                <div className='marca'>
                    <img src={Logo} alt="Muver"/>
                    <p>{t('ui.rodape_sobre')}</p>
                </div>
                <nav aria-label={t('ui.navegar')}>
                    <h3>{t('ui.navegar')}</h3>
                    <a href="/filmes">{t('header.filme')}</a>
                    <a href="/series">{t('header.series')}</a>
                    <a href="/actores">{t('header.actores')}</a>
                    <a href="/filmes/explorar">{t('ui.explorar_filmes')}</a>
                    <a href="/series/explorar">{t('ui.explorar_series')}</a>
                    <a href="/idioma/pt">{t('ui.cinema_pt')}</a>
                    <a href="/privacidade">{t('ui.privacidade')}</a>
                </nav>
                <div>
                    <h3>{t('header.projecto')}</h3>
                    <p>{t('ui.rodape_contribua')}</p>
                    <a className='git' href="https://github.com/moser-jose/muver" target="_blank" rel="noreferrer">
                        <span className="iconspeck speck-github"></span> GitHub
                    </a>
                </div>
            </div>
            <div className='rodape-base'>
                <span>Muver © {new Date().getFullYear()} · {t('ui.direitos')} · {t('ui.por')} <a href='https://github.com/moser-jose' target="_blank" rel="noreferrer">Moser José</a></span>
                <span>{t('ui.tmdb')}</span>
            </div>
        </footer>
    )
}

export default Github
