import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import checkAuth from "./components/Authenticate/CheckAuth";
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className='customBg'>
      <Navbar />
      <div className="customBg2 d-flex align-items-center justify-content-center text-center">
        <div>
          <h1 className="display-3 mb-4" style={{ color: '#fff', fontWeight: 'bold'}}>Welcome to Pharma<span style={{ color: '#ffda9c'}}>Lore</span></h1>
          <p className="lead mb-4" style={{ color: '#fff' }}>Your trusted source for all medical needs</p>
          <Link to="/readAPI" className="btn btn-lg customBtnClr">Explore Medicines</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
