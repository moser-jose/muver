import axios from "axios";


const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
    },
  };
  const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    https: config,
  });


export default api;