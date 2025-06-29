// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AsmiProvider } from './context/contextAsmi';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AsmiProvider>
      <App />
    </AsmiProvider>
  </React.StrictMode>
);
