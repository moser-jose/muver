import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.REACT_APP_APP_URL });

// qualquer pedido falhado avisa a app (ver ApiContext); o ecrã de carregamento mostra o erro em vez de girar para sempre
api.interceptors.response.use(undefined, (erro) => {
    window.dispatchEvent(new CustomEvent('api-erro', {detail: erro.response?.status || 0}));
    return Promise.reject(erro);
});
// Junta as entradas repetidas (mesmo id) numa só, com os valores de `campo` separados por vírgula
export const agrupar = (lista, campo) => {
    const m = new Map();
    lista.forEach((p) => {
        if (!m.has(p.id)) m.set(p.id, {...p, [campo]: []});
        const v = m.get(p.id)[campo];
        if (p[campo] && !v.includes(p[campo])) v.push(p[campo]);
    });
    return [...m.values()].map((p) => ({...p, [campo]: p[campo].join(', ')}));
};

export default api;
