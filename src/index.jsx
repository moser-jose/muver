import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApiContext } from './contexts/ApiContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiContext>
      <App />
    </ApiContext>
  </React.StrictMode>
);
