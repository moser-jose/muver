import React from 'react'
import { useApiContext } from '../contexts/ApiContext';
import Aviso from './Aviso';

// Ecrã de espera; se um pedido à API falhou entretanto, mostra o erro em vez de girar para sempre
const Loading = () => {
    const {i18n, erro}=useApiContext();
    if (erro === 404) return <Aviso titulo="404" texto={i18n.t('ui.nao_encontrada')}/>
    if (erro !== null) return <Aviso titulo={i18n.t('ui.erro_titulo')} texto={i18n.t('ui.erro_texto')} repetir/>
    return (
        <div className="center">
            <div className="ring"></div>
            <span>{i18n.t('home.carregar')}...</span>
      </div>
    )
}

export default Loading
