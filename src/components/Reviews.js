import { ArrowCircleDown, Star } from 'iconsax-react'
import React from 'react'
import User from '../assets/img/profile.jpg'
import moment from 'moment'
import {limita} from '../functions'
import 'moment/locale/pt'
import 'moment/locale/fr'

const Reviews = ({data}) => {
    moment.locale('pt')
    

    return (
        data.length!==0 ? <div className="reviews">
        <div className="titulo">
            <p>Avaliações</p>
            {
                data && data.length > 6 && <a href="/">Ver mais</a>
            }
        </div>
        {
            data.slice(0,6).map((item, key)=>{
                return <div className="rev" key={key}>
                   
                        <div className="img">
                        {
                            item.author_details.avatar_path!==null ?
                                <img 
                                src={
                                    item.author_details.avatar_path.substr(0, 6) === "/https" ?
                                    item.author_details.avatar_path.substr(1):
                                    `https://image.tmdb.org/t/p/w300/${item.author_details.avatar_path}`
                                    }/>:
                                    <img 
                                    src={User}/>
                    }
                    </div>
                  
                    <div className="re">
                        <div>
                            <h3>Uma crítica de <span>{item.author}</span></h3>
                            <h5>Escrito por <span>{item.author_details.username}</span> em {moment(item.updated_at).format('LLLL')}</h5>
                            <p>{limita(item.content,410)}... <a href={item.url}>ler mais</a></p>
                        </div>
                    </div>
                    {
                        item.author_details.rating && <span className="star">
                        <Star size="26" color="yellow" variant="Bulk"/>
                        {item.author_details.rating}
                    </span>
                    }
                    
                </div>
            })
        }
    </div>:<></>
    )
}

export default Reviews
