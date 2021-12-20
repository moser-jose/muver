import React, { useEffect } from 'react'
import { useApiContext } from '../contexts/ApiContext';

const Loading = () => {
    const {i18n,theme}=useApiContext();
    useEffect(() => {
        if(theme ==="light")
        {document.querySelector('body').classList.remove('dark');
            document.querySelector('body').classList.add('light');}
        else
        {document.querySelector('body').classList.remove('light');
            document.querySelector('body').classList.add('dark');}
        
    }, [])
    return (
        <div className="center">
            <div className="ring"></div>
            <span>{i18n.t('home.carregar')}...</span>
      </div>
    )
}

export default Loading
