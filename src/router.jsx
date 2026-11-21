import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import AllActores from './components/Dados/AllActores'
import TypeDetalhes from './components/Dados/TypeDetalhes'
import Actores from './pages/Actores'
import FilmeDetalhe from './pages/FilmeDetalhe'
import Filmes from './pages/Filme'
import FilmesPage from './pages/FilmesPage'
import ActoresDetalhe from './pages/ActoresDetalhe'
import Series from './pages/Series'
import Home from './pages/Home'
import { Loa } from './components/Loa'
import Descobrir from './pages/Descobrir'
import SerieDetalhe from './pages/SerieDetalhe'
import Pesquisa from './pages/Pesquisa'
const router = () => {
    return (
        <Router>
           <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/filmes" element={<Filmes/>} />
                <Route path="/series" element={<Series/>} />
                <Route path="/series/:type" element={<TypeDetalhes media="tv"/>} />
                <Route path="/filme/:slug/:id" element={<FilmeDetalhe/>} />
                <Route path="/filme/:slug/:id/autores" element={<AllActores/>} />
                <Route path="/filme/:slug/:id/:type" element={<TypeDetalhes/>} />
                <Route path="/pesquisa/:q" element={<Pesquisa/>} />
                <Route path="/actores" element={<Actores/>} />
                <Route path="/actores/:slug/:id" element={<ActoresDetalhe/>} />
                <Route path="/actores/:slug/:id/:type" element={<Descobrir tipo="pessoa"/>} />
                <Route path="/streaming/:slug/:id" element={<Descobrir tipo="provedor"/>} />
                <Route path="/canal/:slug/:id" element={<Descobrir tipo="canal" media="tv"/>} />
                <Route path="/pais/:id" element={<Descobrir tipo="pais"/>} />
                <Route path="/idioma/:id" element={<Descobrir tipo="idioma"/>} />
                <Route path="/filmes/explorar" element={<Descobrir tipo="tudo"/>} />
                <Route path="/series/explorar" element={<Descobrir tipo="tudo" media="tv"/>} />
                <Route path="/filmes/:type" element={<TypeDetalhes/>} />
                <Route path="/filmes/generos/:slug/:id" element={<Descobrir tipo="genero"/>} />
                <Route path="/series/generos/:slug/:id" element={<Descobrir tipo="genero" media="tv"/>} />
                <Route path="/keywords/:slug/:id" element={<Descobrir tipo="keyword"/>} />
                <Route path="/produtora/:slug/:id" element={<Descobrir tipo="produtora"/>} />
                <Route path="/coleccao/:slug/:id" element={<Descobrir tipo="coleccao"/>} />
                <Route path="/serie/:slug/:id" element={<SerieDetalhe/>} />
                <Route path="/serie/:slug/:id/autores" element={<AllActores media="tv"/>} />
           </Routes>
        </Router>
    )
}

export default router;
