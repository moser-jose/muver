const API_KEY="1e42ff5303530233d52e0c4c6dfbd312"
const Id_MOVIE=123;
const url ={
    tendenciasPT:`trending/all/week?api_key=${API_KEY}&language=pt-PT`,
    filmesPorId:`https://api.themoviedb.org/3/movie/${Id_MOVIE}?api_key=${API_KEY}language=pt_PT&append_to_response=videos,images`,
    filmesDiscover:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    tvDiscover:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-PT&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate`,
    generosFilmes:`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-PT`

}

export default url;


