import React from 'react';
import styles from './styles/App.module.css'
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
function App() {
  
  return (
      <>
        <Navbar loading={false} isAuth={false} logout={() => console.log('logout')}/>

      </>
  
  );
}

export default App;
