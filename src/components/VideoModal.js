import React from 'react'
import ReactPlayer from 'react-player'

const VideoModal = ({url,setModal}) => {
    return (
        <div className="modal">
            <div className="corpo">
                <span className="close" onClick={()=>setModal(false)}>+</span>
                
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
