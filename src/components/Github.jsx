import React from 'react'

const Github = () => {
    return (
        <div className='project-github'>
            <p className='git-h'>🧑‍💻 Projecto Open Source, contribua em <a title='Muver no Github' href="https://github.com/moser-jose/muver">Github</a> 💪👣  <a className='mo' target="_blank" href='https://github.com/moser-jose'><span>by</span> Moser José</a> </p>
            <p className='dir'><a href='https://muver.vercel.app'>Muver</a> © {new Date().getUTCFullYear()} - Alguns direitos reservados</p>
        </div>
    )
}

export default Github
