import axios from "axios";
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
    },
  };
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_APP_URL}`,
    https: config,
  });
export default api;