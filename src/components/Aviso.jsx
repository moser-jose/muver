import { t } from '../translate/i18n'
import React from 'react'
import Header from './Header'
import Seo from './Seo'

// Mensagem de página inteira: não encontrada, erro da API ou falha inesperada
const Aviso = ({titulo, texto, repetir}) => (
    <div className="aviso simi-detalhe">
        <Header/>
        <Seo titulo={titulo} indexar={false}/>
        <div className="aviso-corpo" role="alert">
            <h1>{titulo}</h1>
            <p>{texto}</p>
            <div>
                {repetir && <button type="button" className="ver" onClick={() => window.location.reload()}>{t('ui.tentar')}</button>}
                <a className="ver" href="/">{t('ui.inicio')}</a>
            </div>
        </div>
    </div>
)

export default Aviso
