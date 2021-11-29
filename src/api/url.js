const API_KEY="1e42ff5303530233d52e0c4c6dfbd312"

const url ={
    tendenciasPT:`trending/all/week?api_key=${API_KEY}&language=pt-PT`,
    filmesPorId:`https://api.themoviedb.org/3/movie/580489?api_key=${API_KEY}language=pt_PT&append_to_response=videos,images`
}

export default url;