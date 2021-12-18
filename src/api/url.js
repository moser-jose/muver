const PT ={
    tendenciasPT:`trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    filmesDiscover:`/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    pessoasTrending:`/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    filmesTendenciasSemana:`/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    filmesTendenciasDia:`/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT`,
    filmesBrevemente:`/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT&page=1&region=PT`,
    filmesTop:`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=pt-PT&page=1`
}

const US ={
    tendenciasPT:`trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    filmesDiscover:`/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    pessoasTrending:`/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    filmesNetflix:`/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    filmesTendenciasSemana:`/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    filmesTendenciasDia:`/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    filmesBrevemente:`/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`,
    filmesTop:`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`

}
const FR ={
    tendenciasPT:`trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    filmesDiscover:`/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    pessoasTrending:`/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    filmesTendenciasSemana:`/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    filmesTendenciasDia:`/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    
    filmesBrevemente:`/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1&region=FR`,
    filmesTop:`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&page=1`

}

export {PT,US,FR};


