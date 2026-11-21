import Seo from '../components/Seo'
import { t, i18n } from '../translate/i18n'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import axios from '../api'
import { limita } from '../functions'
import Header from '../components/Header'
import OpenSource from '../components/OpenSource'
import Loading from '../components/Loading'
import ReactPaginate from '../components/Paginate'
import { DataAll } from '../components/Dados/DataAll'

const idioma = localStorage.getItem(import.meta.env.REACT_APP_I18N_STORAGE_KEY);
const base = {api_key: import.meta.env.REACT_APP_API_KEY, language: idioma};
export const regiao = idioma==="en-US" ? "US" : "PT";

// parâmetro do /discover da TMDB para cada tipo de lista ("tudo" e "coleccao" não têm)
const CAMPO = {genero: 'with_genres', keyword: 'with_keywords', produtora: 'with_companies', provedor: 'with_watch_providers',
    canal: 'with_networks', pessoa: 'with_cast', idioma: 'with_original_language', pais: 'with_origin_country'};
// tipos que existem tanto para filmes como para séries (géneros têm ids diferentes; elenco e canal são só de um)
const DOIS_MEDIA = ['tudo', 'keyword', 'produtora', 'provedor', 'idioma', 'pais'];
const IDIOMAS = ['pt', 'en', 'es', 'fr', 'it', 'de', 'ja', 'ko', 'zh', 'hi'];
const ANOS = Array.from({length: new Date().getFullYear() - 1949}, (_, i) => new Date().getFullYear() + 1 - i);
const nomeDe = (type, codigo) => { try { return new Intl.DisplayNames([i18n.language], {type}).of(codigo) } catch { return codigo } };

const Lista = ({tipo, mediaInicial, id}) => {
    const [media, setMedia] = useState(mediaInicial);
    const [filtros, setFiltros] = useState({ordem: 'popularity.desc', ano: '', nota: '', lingua: ''});
    const [nome, setNome] = useState('');
    const [texto, setTexto] = useState('');
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const tv = media==="tv";
    const mudar = (campo) => (e) => { setFiltros({...filtros, [campo]: e.target.value}); setPage(1); };

    useEffect(() => { // nome a mostrar no topo
        const pedido =
            tipo==="genero" ? axios.get(`/genre/${media}/list`, {params: base}).then((r) => r.data.genres.find((g) => String(g.id)===String(id))?.name) :
            tipo==="keyword" ? axios.get(`/keyword/${id}`, {params: base}).then((r) => r.data.name) :
            tipo==="produtora" ? axios.get(`/company/${id}`, {params: base}).then((r) => r.data.name) :
            tipo==="canal" ? axios.get(`/network/${id}`, {params: base}).then((r) => r.data.name) :
            tipo==="pessoa" ? axios.get(`/person/${id}`, {params: base}).then((r) => r.data.name) :
            tipo==="provedor" ? axios.get(`/watch/providers/movie`, {params: {...base, watch_region: regiao}}).then((r) => r.data.results.find((p) => String(p.provider_id)===String(id))?.provider_name) :
            tipo==="idioma" ? Promise.resolve(nomeDe('language', id)) :
            tipo==="pais" ? Promise.resolve(nomeDe('region', id.toUpperCase())) : null;
        pedido?.then((n) => setNome(n || '')).catch(() => {});
    }, [])
    useEffect(() => {
        let activo = true;
        const vazio = {results: [], total_pages: 0, total_results: 0};
        const porNota = filtros.ordem==='vote_average.desc';
        const pedido = tipo==="coleccao" ?
            axios.get(`/collection/${id}`, {params: base}).then((r) => {
                setNome(r.data.name); setTexto(r.data.overview);
                return {results: r.data.parts, total_pages: 1, total_results: r.data.parts.length, fundo: r.data.backdrop_path};
            }) :
            axios.get(`/discover/${media}`, {params: {...base, include_adult: false, page,
                sort_by: filtros.ordem==='data' ? (tv ? 'first_air_date.desc' : 'primary_release_date.desc') : filtros.ordem,
                [tv ? 'first_air_date_year' : 'primary_release_year']: filtros.ano || undefined,
                'vote_average.gte': filtros.nota || undefined,
                // sem um mínimo de votos, a ordenação por nota enche-se de títulos com um único voto 10
                'vote_count.gte': porNota || filtros.nota ? 200 : undefined,
                with_original_language: filtros.lingua || undefined,
                watch_region: tipo==="provedor" ? regiao : undefined,
                ...(CAMPO[tipo] ? {[CAMPO[tipo]]: tipo==="pais" ? id.toUpperCase() : id} : {}),
            }}).then((r) => r.data);
        // uma colecção que não existe fica no <Loading/>, que mostra o 404; as listas mostram "nenhum resultado"
        pedido.then((d) => activo && setData(d)).catch(() => activo && tipo!=="coleccao" && setData((v) => v || vazio));
        return () => { activo = false };
    }, [page, media, filtros])

    if (!data) return <Loading/>
    const fundo = data.fundo || data.results.find((f) => f.backdrop_path)?.backdrop_path;
    const rotulo = {genero: tv ? t('header.series') : t('ui.filmes'), keyword: t('ui.palavra_chave'), produtora: t('ui.produtora'), coleccao: t('ui.coleccao'),
        provedor: `${t('ui.streaming')} (${regiao})`, canal: t('ui.canal'), pessoa: t('ui.filmografia'), idioma: t('ui.idioma_original'), pais: t('ui.pais'), tudo: t('ui.explorar')}[tipo];
    return (
        <div className='simi-detalhe'>
            <OpenSource/>
            <Header/>
            <Seo titulo={[tipo==="tudo" ? (tv ? t('header.series') : t('ui.filmes')) : nome, rotulo].filter(Boolean).join(' · ')} descricao={texto}/>
            <div className="filme-ho aut" style={{'background': `linear-gradient(rgba(24, 24, 24, 0.5),rgba(24, 24, 24, 0.5))${fundo ? `,url(https://image.tmdb.org/t/p/w1280${fundo})` : ',#17171a'}`}}>
                <div className="pr">
                    <div className="data">
                        <h2 className="title">{rotulo}</h2>
                        <h2 className="_p">{tipo==="tudo" ? (tv ? t('header.series') : t('ui.filmes')) : nome}</h2>
                        {texto && <p className="biograf">{texto.length > 220 ? limita(texto, 220) + '…' : texto}</p>}
                    </div>
                </div>
            </div>
            <div className="todos-actores">
                {tipo!=="coleccao" &&
                    <div className="filtros">
                        {DOIS_MEDIA.includes(tipo) &&
                            <label>{t('ui.tipo')}
                                <select value={media} onChange={(e) => { setMedia(e.target.value); setPage(1); }}>
                                    <option value="movie">{t('ui.filmes')}</option>
                                    <option value="tv">{t('header.series')}</option>
                                </select>
                            </label>
                        }
                        <label>{t('ui.ordenar')}
                            <select value={filtros.ordem} onChange={mudar('ordem')}>
                                <option value="popularity.desc">{t('ui.ord_popularidade')}</option>
                                <option value="vote_average.desc">{t('ui.ord_nota')}</option>
                                <option value="data">{t('ui.ord_data')}</option>
                            </select>
                        </label>
                        <label>{t('ui.ano')}
                            <select value={filtros.ano} onChange={mudar('ano')}>
                                <option value="">{t('ui.todos')}</option>
                                {ANOS.map((a) => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </label>
                        <label>{t('ui.nota_minima')}
                            <select value={filtros.nota} onChange={mudar('nota')}>
                                <option value="">{t('ui.todos')}</option>
                                {[9, 8, 7, 6, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
                            </select>
                        </label>
                        {tipo!=="idioma" &&
                            <label>{t('ui.idioma_original')}
                                <select value={filtros.lingua} onChange={mudar('lingua')}>
                                    <option value="">{t('ui.todos')}</option>
                                    {IDIOMAS.map((l) => <option key={l} value={l}>{nomeDe('language', l)}</option>)}
                                </select>
                            </label>
                        }
                    </div>
                }
                <div className="titulo">
                    <p>{data.total_results ? `${data.total_results} ${tv ? t('ui.n_series') : t('ui.n_filmes')}` : t('ui.nenhum')}</p>
                </div>
                <div className="filmeR simil">
                    {data.results.map((item) => <DataAll key={item.id} item={item} type={tv ? "tv" : "filme"}/>)}
                </div>
                {data.total_pages > 1 &&
                    <ReactPaginate
                        key={media + JSON.stringify(filtros)} // volta à página 1 quando os filtros mudam
                        previousLabel={<ArrowLeft2 size="18" color="#fff" variant="Outline"/>}
                        nextLabel={<ArrowRight2 size="18" color="#fff" variant="Outline"/>}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.min(data.total_pages, 500)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(e) => { setPage(e.selected + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                }
            </div>
        </div>
    )
}

const Descobrir = ({tipo, media="movie"}) => {
    const {id} = useParams();
    return <Lista key={tipo+media+id} tipo={tipo} mediaInicial={media} id={id}/>
}

export default Descobrir
