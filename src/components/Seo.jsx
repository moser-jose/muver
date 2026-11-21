import { useEffect } from 'react'
import { i18n } from '../translate/i18n'

const SITE = 'Muver';
const meta = (selector, valor) => document.querySelector(selector)?.setAttribute(selector.startsWith('link') ? 'href' : 'content', valor);

// Actualiza título, descrição, canonical, Open Graph e dados estruturados da página actual.
// Altera as etiquetas que já existem no index.html em vez de criar duplicadas.
const Seo = ({titulo, descricao, imagem, tipo = 'website', dados, indexar = true}) => {
    useEffect(() => {
        const padrao = i18n.t('ui.seo_descricao');
        const tituloCompleto = titulo ? `${titulo} | ${SITE}` : `${SITE} - ${i18n.t('ui.seo_titulo')}`;
        const texto = (descricao || padrao).replace(/\s+/g, ' ').trim().slice(0, 160);
        const url = location.origin + location.pathname;
        document.title = tituloCompleto;
        document.documentElement.lang = i18n.language;
        meta('meta[name="description"]', texto);
        meta('meta[name="robots"]', indexar ? 'index, follow' : 'noindex, follow');
        meta('link[rel="canonical"]', url);
        meta('meta[property="og:title"]', tituloCompleto);
        meta('meta[property="og:description"]', texto);
        meta('meta[property="og:url"]', url);
        meta('meta[property="og:type"]', tipo);
        meta('meta[property="og:image"]', imagem || `${location.origin}/logo512.png`);
        meta('meta[name="twitter:card"]', imagem ? 'summary_large_image' : 'summary');
        // dados estruturados (schema.org) para os motores de busca
        let ld = document.getElementById('dados-estruturados');
        if (dados) {
            if (!ld) {
                ld = Object.assign(document.createElement('script'), {type: 'application/ld+json', id: 'dados-estruturados'});
                document.head.appendChild(ld);
            }
            ld.textContent = JSON.stringify({'@context': 'https://schema.org', url, ...dados});
        } else ld?.remove();
    }, [titulo, descricao, imagem])
    return null;
}

export default Seo
