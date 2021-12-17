import React,{useState,useEffect} from 'react';
import './assets/sass/app.scss';
import Github from './components/Github';
import Up from './components/Up';
import VideoModal from './components/VideoModal';
import { useApiContext } from './contexts/ApiContext';
import Router from './router';

function App() {
  const {modal}=useApiContext();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
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
      {scrollPosition > 70 && <><Up/><Github/></>}
      
    </div>
  );
}

export default App;
