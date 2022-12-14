import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider, useStore } from 'react-redux';
//import { injectStore } from "./api/index";
//injectStore(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);