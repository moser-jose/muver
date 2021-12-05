const PT ={
    tendenciasPT:`trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    filmesDiscover:`/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    pessoasTrending:`/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    filmesBrevemente:`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT&page=1&sort_by=popularity.asc`,
}

const US ={
    tendenciasPT:`trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    filmesDiscover:`/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    pessoasTrending:`/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    filmesBrevemente:`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&sort_by=popularity.asc`,
}
const FR ={
    tendenciasPT:`trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    filmesDiscover:`/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    pessoasTrending:`/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    filmesBrevemente:`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1&sort_by=popularity.asc`,
}

export {PT,US,FR};


