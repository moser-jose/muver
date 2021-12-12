import React from 'react'

const Keywords = ({data, back,lang, companies}) => {
    console.log(companies)
    return (
        <div className="colecao" 
        style={{'background': 
        `linear-gradient(rgba(24, 24, 24, 0.3),rgba(24, 24, 24, 0.6)),url(https://image.tmdb.org/t/p/original${back})`}}>
            
            <div className="data">
                <div className="colect">
                    <h2>Palavras Chave</h2>
                        {
                            data.keywords.slice(0,18).map((item, key)=>{
                                return <a key={key} className="fi" href={`/keywords/${item.id}`}>{item.name}</a>
                            })
                        }
                       <div className="pais">
                            {
                                lang.map((item, key)=>{
                                    return <div className="imgK" key={key}>
                                            <img src={`https://flagcdn.com/w320/${item.iso_3166_1.toLowerCase()}.png`} alt={item.name}/>                                    
                                        </div>
                                })
                            }
                       </div>
                </div>
                <div className="colect">
                        <div className="img-k">
                            {
                                companies.map((item, key)=>{
                                    return item.logo_path && <img key={key} src={`https://image.tmdb.org/t/p/original${item.logo_path}`}/>
                                })
                            }
                        </div>
                </div>
            </div>
            

        </div>
    )
}

export default Keywords
