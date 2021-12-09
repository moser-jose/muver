import React from 'react'
import ReactPlayer from 'react-player'
import { useApiContext } from '../contexts/ApiContext'

const VideoModal = (/* {url,setModal} */) => {
    const {setModal,setUrl, url}=useApiContext();

    const closeModal=()=>{
        setModal(false);
        setUrl("");
    }
    return (
        <div className="modal">
            <div className="corpo">
                <span className="close" onClick={closeModal}>+</span>
                
                <ReactPlayer
                    className="video"
                    width="100%" 
                    height="100%" 
                    url={`https://www.youtube.com/watch?v=${url}`}
                    playing={true}
                    />
            </div>
        </div>
    )
}

export default VideoModal
