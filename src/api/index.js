import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.REACT_APP_APP_URL });
export default api;
