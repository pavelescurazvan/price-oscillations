import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import store from './store'
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error("Root not found");

const root = ReactDOM.createRoot(rootEl);


root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
