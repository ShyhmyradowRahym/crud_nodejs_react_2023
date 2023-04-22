import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store';
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MantineProvider>
        <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
          <App />
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
