import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Detalhe from './pages/Detalhe'
import Filmes from './pages/Filme'
import Home from './pages/Home'
import Series from './pages/Series'
const router = () => {
    return (
        <Router>
           <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/filmes" element={<Filmes/>} />
                <Route path="/series" element={<Series/>} />
                <Route path="/filme/:slug/:id" element={<Detalhe/>} />

                    {/* <Route path="privacidade" element={<Privacidade />} />
                    <Route path="termos" element={<Termos />} />
                    <Route path="projectos/:slug" element={<DadosProjectos />} />
                    <Route path="*" element={<NotFound />} /> */}
           </Routes>
        </Router>
    )
}

export default router;
