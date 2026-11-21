import React from 'react'
import { PlayCircle } from 'iconsax-react'
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
                            <img loading="lazy" alt={item.name} src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}/>
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
