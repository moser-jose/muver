import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import { SlideHeader } from '../components/SlideHeader';


const Home = () => {

    return (
            <div className="container">
                <div className="home">
                    <Header/>
                    <SlideHeader/>   
                </div>
            </div>
    )
}

export default Home
