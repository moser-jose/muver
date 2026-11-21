import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import { ArrowUp2 } from 'iconsax-react'
const Up = () => {
    return (
        <div className='btn-top' onClick={() => scroll.scrollToTop()}>
            <ArrowUp2 size="20" color="#fff" variant="Bold"/>
        </div>
    )
}

export default Up
