import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import Navbar from '../Navbar/Navbar';
import checkAuth from "../Authenticate/CheckAuth";
import logo from '../Navbar/logo.png';


function AboutUs() {
    const navigator = useNavigate();

    function doNavigate() {
        navigator('/');
    }

    return (
        <div className="customBg">
            <Navbar />
            <div className='container w-75 bg-white rounded mt-5 p-4'>
                <div className='row'>
                    <div className='col'>
                        <div className='container bg-white rounded'>
                            <h1 style={{ fontWeight: 'bold', color: '#eecd1d' }}>Welcome to <img src={logo} alt="logo of FilmiHub" className="img-fluid" style={{ maxHeight: '72px', paddingBottom: '23px', marginLeft: '-18px'}} /></h1>
                            <p>
                                At FilmiHub, we are passionate about bringing the magic of cinema to your fingertips.
                                Immerse yourself in a world of entertainment, where every click opens the door to a
                                cinematic adventure.
                            </p>
                            <p>
                                Our mission is to make your movie-watching experience seamless and enjoyable.
                                Whether you are a movie enthusiast or a casual viewer, FilmiHub is your go-to
                                destination for all things cinema.
                            </p>
                            <p>
                                Explore the latest releases, manage your screening schedules, and delight your
                                audience with an exceptional movie-going experience.
                            </p>
                            <button className='btn customBtnClrAlt' onClick={doNavigate}>Home Page</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(AboutUs);
