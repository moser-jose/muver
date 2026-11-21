import React from 'react'
import { ArrowUp2 } from 'iconsax-react'
const Up = () => {
    return (
        <button type="button" aria-label="Voltar ao topo" className='btn-top' onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
            <ArrowUp2 size="20" color="#fff" variant="Bold"/>
        </button>
    )
}

export default Up
