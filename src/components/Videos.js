import React from 'react'
import { PlayCircle } from 'iconsax-react'
import ReactPlayer from 'react-player'
import { useApiContext } from '../contexts/ApiContext';

const Videos = ({data}) => {
    const {setModal,setUrl}=useApiContext();

    const Modal=(link)=>{
        setUrl("");
        setModal(true);
        setUrl(link);
    }
    return (
        <div className="videos">
            <div className="v">
                {
                    data.results.map((item, key)=>{
                        return <div key={key}  className="vid"> 
                            <ReactPlayer 
                                    width="100%" 
                                    height="100%" 
                                    url={`https://www.youtube.com/watch?v=${item.key}`}
                                    light={true}
                                    playIcon={<></>}
                                />
                            <div className="v-c" onClick={()=>Modal(item.key)} title={item.type+ " - "+item.name}>
                                <div className="pla" onClick={()=>Modal(item.key)}>
                                    <PlayCircle onClick={()=>Modal(item.key)} size="38" color="#fff" variant="Bulk"/>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Videos
