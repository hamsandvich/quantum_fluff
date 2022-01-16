import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {StoreProvider} from './context';

ReactDOM.render(
  <StoreProvider>
    <Router><App /></Router>
  </StoreProvider>,
  document.getElementById('root')
);
