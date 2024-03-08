import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import axios from "axios";

import Navbar from "../Navbar/Navbar";



import '../../App.css';  // Import your CSS file
import './bookingDetails.css';  // Import your CSS file

function BookingDetails() {
  var user = useSelector(store=>store.auth.user);
  var {postId} = useParams()
  const [bookingId, setBookingId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [movieName, setMovieName] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [seatNumbers, setSeatNumbers] = useState('');
  const [movieDesc, setMovieDesc] = useState('');
  const [movieId, setMovieId] = useState('');
  


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/adminHub/APIreadbookingsspecial/${postId}/`)
      .then(response => {
        setBookingId(response.data.id);
        setBookingDate(response.data.bookingDate);
        setSeatNumbers(response.data.seatNumbers);
        setMovieId(response.data.movie_id);
        setBookingTime(response.data.bookingTime);
  
        // Nested axios call
        if (response.data.movie_id) {
          axios.get(`http://127.0.0.1:8000/adminHub/APIreadspecial/${response.data.movie_id}/`)
            .then(response => {
              setMovieName(response.data.movieName);
              setMovieDesc(response.data.movieDesc);
              setMovieGenre(response.data.movieGenre);
            })
            .catch(error => {
              console.error('Error fetching movie details:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, [postId]); 


  return(
    <div className='customBg'>
      <Navbar/>      
      <div className='htmlInstance' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <div className="row">
            <div className="col-12">
                <div className="ticket created-by-anniedotexe">
                    <div className="left">
                        <div className="image">
                            <p className="admit-one">
                                <span>FILMIHUB</span>
                                <span>FILMIHUB</span>
                                <span>FILMIHUB</span>
                            </p>
                            <div className="ticket-number">
                                <p>#{bookingId}</p>
                            </div>
                        </div>
                        <div className="ticket-info">
                            <p className="date">
                                <span>CINEPHILE</span>
                                <span className="june-29">FILMIHUB</span>
                                <span>PARADISE</span>
                            </p>
                            <div className="show-name">
                                <h1>YOUR TICKET</h1>
                                <h2>Non Transferable</h2>
                            </div>
                            <div className="time">
                                <p>{bookingDate}</p>
                                <p>Show <span>@</span> {bookingTime}</p>
                            </div>
                                <p className="location">
                                    <span>Website</span>
                                    <span className="separator">:</span>
                                    <span>www.filmihub.com</span>
                                </p>
                            </div>
                        </div>
                        <div className="right">
                            <p className="admit-one">
                                <span>FILMIHUB</span>
                                <span>FILMIHUB</span>
                                <span>FILMIHUB</span>
                            </p>
                            <div className="right-info-container">
                                <div className="show-name">
                                    <h1>     </h1>
                                </div>
                                <div className="time">
                                <p>{bookingDate}</p>
                                <p>Show <span>@</span> {bookingTime}</p>
                                </div>
                                <div className="barcode">
                                    <img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code" />
                                </div>
                                <p className="ticket-number">#{bookingId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )

}

export default BookingDetails;
