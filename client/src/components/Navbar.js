import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/App.module.css';

const Navbar = ({ isAuth, loading, logout }) => {
    const authLinks = (
        <ul>
          <li>
            <Link to="/dashboard"><i className='fas fa-user' />{' '}<span className='hide-sm'>Dashboard</span></Link>
          </li>
        <li><a href="#!" onClick={logout}>
          <i className='fas fa-sign-out-alt' />{' '}<span className='hide-sm' >Logout</span> 
          </a></li>
      </ul>
      ); 
      const guessLinks = (
        <ul>
        <li><Link to="/Reviews">Reviews</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      );
      return (
          <nav className="navbar bg-dark">
          <h1>
            <Link to="/"><i className="fas fa-code"></i> Quantum Fluff</Link>
          </h1>
         {!loading && (<> { isAuth ? authLinks: guessLinks}</>)}
        </nav>
      )
    }




export default Navbar;