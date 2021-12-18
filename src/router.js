import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import AutoresDetalhes from './components/Dados/AutoresDetalhes'
import TypeDetalhes from './components/Dados/TypeDetalhes'
import Up from './components/Up'
import Actores from './pages/Actores'
import Detalhe from './pages/Detalhe'
import Filmes from './pages/Filme'
import Series from './pages/Series'
const router = () => {
    return (
        <Router>
           <Routes>
                <Route path="/" element={<Filmes/>} />
                <Route path="/filmes" element={<Filmes/>} />
                <Route path="/series" element={<Series/>} />
                <Route path="/filme/:slug/:id" element={<Detalhe/>} />
                <Route path="/filme/:slug/:id/autores" element={<AutoresDetalhes/>} />
                <Route path="/filme/:slug/:id/:type" element={<TypeDetalhes/>} />
                <Route path="/actores" element={<Actores/>} />

                    {/* <Route path="privacidade" element={<Privacidade />} />
                    <Route path="termos" element={<Termos />} />
                    <Route path="projectos/:slug" element={<DadosProjectos />} />
                    <Route path="*" element={<NotFound />} /> */}
           </Routes>
        </Router>
    )
}

export default router;
