import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.REACT_APP_APP_URL });

// qualquer pedido falhado avisa a app (ver ApiContext); o ecrã de carregamento mostra o erro em vez de girar para sempre
api.interceptors.response.use(undefined, (erro) => {
    window.dispatchEvent(new CustomEvent('api-erro', {detail: erro.response?.status || 0}));
    return Promise.reject(erro);
});
export default api;
