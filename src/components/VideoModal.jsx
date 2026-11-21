import React from 'react'
import { useApiContext } from '../contexts/ApiContext'

const VideoModal = () => {
    const {setModal,setUrl, url}=useApiContext();

    const closeModal=()=>{
        setModal(false);
        setUrl("");
    }
    return (
        <div className="modal">
            <div className="corpo">
                <button type="button" aria-label="Fechar" className="close" onClick={closeModal}>+</button>
                
                <iframe
                    className="video"
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${url}?autoplay=1`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    />
            </div>
        </div>
    )
}

export default VideoModal
