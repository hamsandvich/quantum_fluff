import React from 'react';
import styles from './styles/App.module.css'
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import './App.css';
function App() {
  
  return (
      <>
        <Navbar loading={false} isAuth={false} logout={() => console.log('logout')}/>
        <Routes>
          <Route exact path="/login" element={<Login isAuth={false} login={() => console.log("logged in")}/>}/>
          <Route exact path="/register" element={<Register isAuth={false} login={() => console.log("logged in")}/>}/>
        </Routes>
      </>
  
  );
}


export default App;
