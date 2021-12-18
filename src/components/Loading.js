import React from 'react'
import { useApiContext } from '../contexts/ApiContext';

const Loading = () => {
    const {i18n}=useApiContext();
    return (
        <div className="center">
            <div className="ring"></div>
            <span>{i18n.t('home.carregar')}...</span>
      </div>
    )
}

export default Loading
