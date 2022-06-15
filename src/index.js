import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {reducerMain} from "./redux/allreducers"
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducerMain, /* preloadedState, */ composeEnhancers(
   applyMiddleware(thunk)
 ));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>
);

 
