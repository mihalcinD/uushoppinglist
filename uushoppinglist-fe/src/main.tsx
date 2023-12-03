import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ContextsContainer from './context/ContextsContainer.tsx';
import '../i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextsContainer>
      <App />
    </ContextsContainer>
  </React.StrictMode>,
);
