const API_KEY="1e42ff5303530233d52e0c4c6dfbd312"
const Id_MOVIE=123;
const Id_PERSON=998;
const PT ={
    tendenciasPT:`trending/all/week?api_key=${API_KEY}&language=pt-PT`,
    filmesPorId:`https://api.themoviedb.org/3/movie/${Id_MOVIE}?api_key=${API_KEY}language=pt-PT&append_to_response=videos,images,reviews,credits,similar`,
    filmesDiscover:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-PT`,
    pessoasTrending:`https://api.themoviedb.org/3/trending/person/week?api_key=${API_KEY}&language=pt-PT`,
    pessoasPorId:`https://api.themoviedb.org/3/person/${Id_PERSON}?api_key=${API_KEY}&language=pt-PT&append_to_response=images,credits`,
    filmesBrevemente:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-PT&page=1&sort_by=popularity.asc`,
}

const US ={
    tendenciasPT:`trending/all/week?api_key=${API_KEY}&language=en-US`,
    filmesPorId:`https://api.themoviedb.org/3/movie/${Id_MOVIE}?api_key=${API_KEY}language=en-US&append_to_response=videos,images,reviews,credits,similar`,
    filmesDiscover:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    pessoasTrending:`https://api.themoviedb.org/3/trending/person/week?api_key=${API_KEY}&language=en-US`,
    pessoasPorId:`https://api.themoviedb.org/3/person/${Id_PERSON}?api_key=${API_KEY}&language=en-US&append_to_response=images,credits`,
    filmesBrevemente:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.asc`,
}
const FR ={
    tendenciasPT:`trending/all/week?api_key=${API_KEY}&language=fr-FR`,
    filmesPorId:`https://api.themoviedb.org/3/movie/${Id_MOVIE}?api_key=${API_KEY}language=fr-FR&append_to_response=videos,images,reviews,credits,similar`,
    filmesDiscover:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-FR`,
    pessoasTrending:`https://api.themoviedb.org/3/trending/person/week?api_key=${API_KEY}&language=fr-FR`,
    pessoasPorId:`https://api.themoviedb.org/3/person/${Id_PERSON}?api_key=${API_KEY}&language=fr-FR&append_to_response=images,credits`,
    filmesBrevemente:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=fr-FR&page=1&sort_by=popularity.asc`,
}

export {PT,US,FR};


