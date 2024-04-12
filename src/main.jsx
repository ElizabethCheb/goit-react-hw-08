import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { store, persistor } from './redux/store';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);