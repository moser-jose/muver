import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import AllActores from './components/Dados/AllActores'
import TypeDetalhes from './components/Dados/TypeDetalhes'
import TypeDetalhesActores from './components/Dados/TypeDetalhesActores'
import Actores from './pages/Actores'
import FilmeDetalhe from './pages/FilmeDetalhe'
import Filmes from './pages/Filme'
import FilmesPage from './pages/FilmesPage'
import ActoresDetalhe from './pages/ActoresDetalhe'
import Series from './pages/Series'
import { Loa } from './components/Loa'
import { Genrs } from './pages/Genrs'
const router = () => {
    return (
        <Router>
           <Routes>
                <Route path="/" element={<Filmes/>} />
                <Route path="/filmes" element={<Filmes/>} />
                <Route path="/series" element={<Series/>} />
                <Route path="/filme/:slug/:id" element={<FilmeDetalhe/>} />
                <Route path="/filme/:slug/:id/autores" element={<AllActores/>} />
                <Route path="/filme/:slug/:id/:type" element={<TypeDetalhes/>} />
                <Route path="/actores" element={<Actores/>} />
                <Route path="/actores/:slug/:id" element={<ActoresDetalhe/>} />
                <Route path="/actores/:slug/:id/:type" element={<TypeDetalhesActores/>} />
                <Route path="/filmes/:type" element={<TypeDetalhes/>} />
                <Route path="/filmes/generos/:slug/:id" element={<Genrs/>} />
           </Routes>
        </Router>
    )
}

export default router;
