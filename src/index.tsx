import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {App} from './components/App/App';
import './styles/index.scss';

const root = createRoot(
  // eslint-disable-next-line prettier/prettier
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
