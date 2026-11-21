import React,{useState,useEffect} from 'react';
import 'react-slideshow-image/dist/styles.css';
import './assets/sass/app.scss';
import Github from './components/Github';
import Up from './components/Up';
import VideoModal from './components/VideoModal';
import { useApiContext } from './contexts/ApiContext';
import Router from './router';

function App() {
  const {modal}=useApiContext();
  // booleano: só re-renderiza quando cruza o limite, não a cada pixel de scroll
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => setScrolled(window.scrollY > 70);
  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
      }
  }, [])
  return (
    <div className="App">
      {modal === true && <VideoModal/>}
      <Router/>
      <Github/>
      {scrolled && <Up/>}
    </div>
  );
}

export default App;
