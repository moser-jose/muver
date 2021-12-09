import './assets/sass/app.scss';
import VideoModal from './components/VideoModal';
import { useApiContext } from './contexts/ApiContext';
import Router from './router';
function App() {
  const {modal}=useApiContext();
  return (
    <div className="App">
        {modal === true && <VideoModal/>}
      <Router/>
    </div>
  );
}

export default App;
