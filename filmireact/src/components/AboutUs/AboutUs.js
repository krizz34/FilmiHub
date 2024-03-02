import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import Navbar from '../Navbar/Navbar'
import checkAuth from "../Authenticate/CheckAuth";



function Aboutus() {

    const navigator = useNavigate()
    function doNavigate(){
        navigator('/')
    }

    return (
      <div className="customBg">
      <Navbar />
      <div className='container w-50 bg-white rounded mt-5 p-3'>
          {/* <p className='customText'>Hola Globo</p> */}
          <div className='row'>
            <div className='col'>
              <div className='container bg-white rounded'>
              <h1 style={{ fontWeight: 'bold', color: '#531251' }}>About Us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
           laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
           esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui
           officia deserunt mollit anim id est laborum.
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
           laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
           esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui
           officia deserunt mollit anim id est laborum.
        </p>
        <button className='btn customBtnClrAlt' onClick={doNavigate}>Home Page</button> {/* done with programatic navigator (useNavigate) */}

              </div>
            </div>
          </div>
      </div>
    </div>
);
}

export default checkAuth(Aboutus);