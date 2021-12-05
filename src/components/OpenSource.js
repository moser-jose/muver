import React from 'react'
import { useApiContext } from '../contexts/ApiContext';

const OpenSource = () => {
    const {i18n}=useApiContext();
    return (
        <div className="open">
            <span className="pro">{i18n.t('header.projecto')} 👨🏽‍💻</span>
            <a title={i18n.t('header.github')} target="_blank" href="https://github.com/moser-jose/muver"><span className="iconspeck speck-github"></span></a>
        </div>
    )
}

export default OpenSource
