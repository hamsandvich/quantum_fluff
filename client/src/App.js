import React from 'react';
import styles from './styles/App.module.css'
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CourseReviews from './components/pages/Course-Review'
import FrontPage from'./components/pages/FrontPage'
import './App.css';
import AddReview from './components/pages/Add-Review';
function App() {
  
  return (
      <>
        <Navbar loading={false} isAuth={false} logout={() => console.log('logout')}/>
        <Routes>
          <Route exact path="/login" element={<Login isAuth={false} login={() => console.log("logged in")}/>}/>
          <Route exact path="/register" element={<Register isAuth={false} login={() => console.log("logged in")}/>}/>
          <Route exact path="/Reviews" element={<CourseReviews/>} />
          <Route exact path="/add-review" element={<AddReview />} />
          <Route exact path="/Front-page" element={<FrontPage />} />
        </Routes>
      </>
  
  );
}


export default App;
