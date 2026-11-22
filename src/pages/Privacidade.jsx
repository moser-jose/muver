import React from 'react'
import { i18n } from '../translate/i18n'
import Header from '../components/Header'
import OpenSource from '../components/OpenSource'
import Seo from '../components/Seo'

const ACTUALIZADA = '2026-11-22';
const CONTACTO = 'https://github.com/moser-jose/muver/issues';

// Cada secção: [título, parágrafos ou listas (um array é uma lista)]
const TEXTO = {
    pt: {
        titulo: 'Política de Privacidade',
        actualizada: 'Última actualização',
        intro: 'Esta política aplica-se ao site muver.moserjose.com e à aplicação móvel Muver para Android e iOS (em conjunto, "o Muver"). O Muver é um projecto de código aberto, sem fins lucrativos, mantido por Moser José.',
        seccoes: [
            ['Resumo', [[
                'Não há contas nem registo: o Muver não pede nome, email, palavra-passe nem qualquer outro dado pessoal.',
                'Não usamos publicidade, ferramentas de análise nem rastreadores, e não vendemos nem partilhamos dados para marketing.',
                'A aplicação móvel não pede nenhuma permissão do telemóvel (localização, contactos, câmara, microfone, notificações).',
                'As únicas coisas guardadas ficam no seu próprio dispositivo: o tema (claro ou escuro) e o idioma.',
            ]]],
            ['Dados guardados no seu dispositivo', [
                'No site, as preferências de tema e de idioma ficam no armazenamento local do navegador (localStorage). Na aplicação, ficam numa pequena base de dados local do próprio telemóvel. Estes dados nunca saem do dispositivo e não são enviados para nós.',
                'O Muver não usa cookies próprios. Pode apagar estas preferências limpando os dados do site no navegador ou desinstalando a aplicação.',
            ]],
            ['Pesquisas e navegação', [
                'O que pesquisa e as páginas que abre servem apenas para pedir o conteúdo correspondente à TMDB. O Muver não tem servidor próprio que guarde o seu histórico de pesquisa ou de navegação.',
            ]],
            ['Serviços de terceiros', [
                'Para mostrar o conteúdo, o seu dispositivo liga-se directamente a serviços externos. Como em qualquer ligação à Internet, esses serviços recebem o seu endereço IP e dados técnicos do navegador ou do dispositivo, e tratam-nos segundo as suas próprias políticas:',
                [
                    'The Movie Database (TMDB): informação e imagens de filmes, séries e pessoas, incluindo os termos que pesquisa. Dados de disponibilidade em streaming fornecidos pela JustWatch através da TMDB.',
                    'YouTube (Google): miniaturas dos vídeos e, quando abre um trailer, o leitor de vídeo. No site o leitor usa o modo de privacidade melhorada (youtube-nocookie.com); na aplicação o trailer abre no YouTube.',
                    'Vercel: alojamento do site. Regista dados técnicos de acesso (endereço IP, data e hora, página pedida) para operar e proteger o serviço.',
                    'Google Fonts e jsDelivr: tipos de letra e ícones usados no site.',
                    'FlagCDN: imagens das bandeiras dos países.',
                    'Google Play e App Store: as lojas onde descarrega a aplicação recolhem os seus próprios dados de instalação e de falhas, segundo as políticas da Google e da Apple.',
                ],
                'O Muver contém ligações para sites externos (por exemplo IMDb, GitHub e os serviços de streaming). Ao segui-las, passa a aplicar-se a política desses sites.',
            ]],
            ['Crianças', [
                'O Muver não se destina especificamente a crianças e não recolhe conscientemente dados pessoais de ninguém, incluindo menores. O catálogo vem da TMDB e pode incluir títulos com classificação etária para adultos.',
            ]],
            ['Os seus direitos', [
                'Como o Muver não recolhe nem guarda dados pessoais seus, não temos dados para consultar, corrigir ou apagar. Os direitos de acesso, rectificação e eliminação previstos na legislação aplicável (como o RGPD) podem ser exercidos junto dos serviços de terceiros indicados acima, relativamente aos dados que eles tratem.',
            ]],
            ['Alterações a esta política', [
                'Se o Muver passar a ter funcionalidades que envolvam dados pessoais (por exemplo, contas de utilizador), esta página será actualizada antes de essas funcionalidades ficarem disponíveis, e a data no topo será alterada.',
            ]],
            ['Contacto', ['Para dúvidas sobre privacidade, abra um pedido no repositório do projecto:']],
        ],
    },
    en: {
        titulo: 'Privacy Policy',
        actualizada: 'Last updated',
        intro: 'This policy applies to the website muver.moserjose.com and to the Muver mobile app for Android and iOS (together, "Muver"). Muver is a non-profit, open source project maintained by Moser José.',
        seccoes: [
            ['Summary', [[
                'There are no accounts or sign-up: Muver does not ask for your name, email, password or any other personal data.',
                'We use no advertising, analytics or trackers, and we do not sell or share data for marketing.',
                'The mobile app requests no device permissions (location, contacts, camera, microphone, notifications).',
                'The only things stored stay on your own device: the theme (light or dark) and the language.',
            ]]],
            ['Data stored on your device', [
                'On the website, your theme and language preferences are kept in the browser\'s local storage (localStorage). In the app, they are kept in a small local database on the phone itself. This data never leaves the device and is not sent to us.',
                'Muver sets no cookies of its own. You can delete these preferences by clearing the site data in your browser or by uninstalling the app.',
            ]],
            ['Searches and browsing', [
                'What you search for and the pages you open are used only to request the matching content from TMDB. Muver has no server of its own that stores your search or browsing history.',
            ]],
            ['Third-party services', [
                'To show content, your device connects directly to external services. As with any internet connection, those services receive your IP address and technical data about your browser or device, and handle them under their own policies:',
                [
                    'The Movie Database (TMDB): information and images for movies, TV shows and people, including the terms you search for. Streaming availability data is provided by JustWatch through TMDB.',
                    'YouTube (Google): video thumbnails and, when you open a trailer, the video player. On the website the player uses privacy-enhanced mode (youtube-nocookie.com); in the app the trailer opens in YouTube.',
                    'Vercel: website hosting. It logs technical access data (IP address, date and time, page requested) to operate and protect the service.',
                    'Google Fonts and jsDelivr: fonts and icons used on the website.',
                    'FlagCDN: country flag images.',
                    'Google Play and the App Store: the stores where you download the app collect their own installation and crash data, under Google\'s and Apple\'s policies.',
                ],
                'Muver contains links to external sites (for example IMDb, GitHub and streaming services). When you follow them, those sites\' policies apply.',
            ]],
            ['Children', [
                'Muver is not specifically directed at children and does not knowingly collect personal data from anyone, including minors. The catalogue comes from TMDB and may include titles rated for adults.',
            ]],
            ['Your rights', [
                'Because Muver does not collect or store your personal data, we hold no data to access, correct or delete. The rights of access, rectification and erasure under applicable law (such as the GDPR) can be exercised with the third-party services listed above, for the data they process.',
            ]],
            ['Changes to this policy', [
                'If Muver adds features that involve personal data (for example, user accounts), this page will be updated before those features become available, and the date at the top will change.',
            ]],
            ['Contact', ['For privacy questions, open an issue in the project repository:']],
        ],
    },
};

const Privacidade = () => {
    const x = TEXTO[i18n.language.startsWith('en') ? 'en' : 'pt'];
    return (
        <div className="simi-detalhe">
            <OpenSource/>
            <Header/>
            <Seo titulo={x.titulo} descricao={x.intro}/>
            <article className="legal">
                <h1>{x.titulo}</h1>
                <p className="data">{x.actualizada}: {new Date(ACTUALIZADA).toLocaleDateString(i18n.language, {dateStyle: 'long', timeZone: 'UTC'})}</p>
                <p>{x.intro}</p>
                {x.seccoes.map(([titulo, blocos]) => (
                    <section key={titulo}>
                        <h2>{titulo}</h2>
                        {blocos.map((b, i) => Array.isArray(b) ? <ul key={i}>{b.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={i}>{b}</p>)}
                    </section>
                ))}
                <p><a href={CONTACTO} target="_blank" rel="noreferrer">{CONTACTO.replace('https://', '')}</a></p>
            </article>
        </div>
    )
}

export default Privacidade
