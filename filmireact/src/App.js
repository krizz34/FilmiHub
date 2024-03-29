import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import checkAuth from "./components/Authenticate/CheckAuth";
import { Link } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';  // Import PersistGate
import { store, persistor } from './components/Redux/Store';  // Import the store and persistor
import logo from './logo-white.png';

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>  {/* Wrap your app with PersistGate */}
      <div className='customBg'>
        <Navbar />
        <div className="customBg2 d-flex align-items-center justify-content-center text-center">
          <div>
            <h1 className="display-3 mb-4" style={{ color: '#000000', fontWeight: 'bold'}}>Welcome to <img src={logo} alt="logo of FilmiHub" className="img-fluid" style={{ maxHeight: '92px', paddingBottom: '20px'}} /></h1>
            <p className="lead mb-4" style={{ color: '#000000' }}>Book tickets, explore movies, and experience entertainment like never before!</p>
            <Link to="/readAPI" className="btn btn-lg customBtnClr">Explore Screenings</Link>
          </div>
        </div>
      </div>
    </PersistGate>
  );
}

export default App;
