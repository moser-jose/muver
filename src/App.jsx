import React,{useState,useEffect} from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import './assets/sass/app.scss';
import Github from './components/Github';
import Up from './components/Up';
import VideoModal from './components/VideoModal';
import Aviso from './components/Aviso';
import { useApiContext } from './contexts/ApiContext';
import { t } from './translate/i18n';
import Rotas from './router';

// Uma falha ao desenhar uma página mostra um aviso em vez de deixar o ecrã em branco
class Limite extends React.Component {
  state = {falhou: false};
  static getDerivedStateFromError() { return {falhou: true}; }
  render() {
    return this.state.falhou ? <Aviso titulo={t('ui.erro_titulo')} texto={t('ui.erro_texto')} repetir/> : this.props.children;
  }
}

function Conteudo() {
  const {modal, setModal, setErro}=useApiContext();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  // booleano: só re-renderiza quando cruza o limite, não a cada pixel de scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 70);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
  }, [])
  // Navegação sem recarregar: os links internos continuam a ser <a href> normais (bom para SEO e para
  // abrir num separador novo), mas o clique simples é entregue ao router em vez de recarregar o site.
  useEffect(() => {
      const aoClicar = (e) => {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          const a = e.target.closest?.('a[href]');
          if (!a || a.target || a.hasAttribute('download') || a.origin !== window.location.origin) return;
          e.preventDefault();
          navigate(a.pathname + a.search + a.hash);
      };
      document.addEventListener('click', aoClicar);
      return () => document.removeEventListener('click', aoClicar);
  }, [navigate])
  // em cada página nova: volta ao topo, fecha o vídeo e esquece erros da página anterior
  useEffect(() => {
      window.scrollTo(0, 0);
      setModal(false);
      setErro(null);
  }, [pathname])
  return (
    <div className="App">
      {modal === true && <VideoModal/>}
      {/* a key recria a página quando o endereço muda, para cada uma carregar os seus dados de raiz */}
      <Limite key={pathname}>
        <Rotas/>
      </Limite>
      <Github/>
      {scrolled && <Up/>}
    </div>
  );
}

const App = () => <BrowserRouter><Conteudo/></BrowserRouter>

export default App;
