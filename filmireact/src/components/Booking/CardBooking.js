import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import sampleMovieImage from '../CRUD/tempMovie.png';

import '../CRUD/Card.css';




function CardBooking(props) {
    const [movieName, setMovieName] = useState(null);
    let navigate = useNavigate();
    // navigate('/readAPI');



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/adminHub/APIreadspecial/${props.post.movie}/`)
            .then(response => {
                setMovieName(response.data.movieName);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }, [props.post.movie_id]); 
    console.log('Props.post:', props.post);
   
    return (   

        <div className="col"  style={{ marginBottom: '30px' }}>
            <div className="card h-100 shadow-sm">
                {/* <img src={sampleMovieImage} className="card-img-top" alt="Movie Poster" /> */}
                <div className="card-body">
                    <div className="clearfix mb-3">
                        <span className="float-start badge rounded-pill bg-success"> Booked </span>
                    </div>
                    <h5 className="card-title">{movieName}</h5>
                    <p className="card-text" style={{ marginTop: '-40px' }}>Booking ID: {props.post.id}</p><br/>
                    <p className="card-text" style={{ marginTop: '-40px' }}>Date: {props.post.bookingDate}</p><br/>
                    <p className="card-text" style={{ marginTop: '-40px' }}>Time: {props.post.bookingTime}</p><br/>
                    <p className="card-text" style={{ marginTop: '-40px' }}>Seats: {props.post.seatNumbers}</p>
                    <div className="text-center">
                        <Link to={`/bookingDetails/${props.post.id}`} className="btn btn-block mb-2 bookNowBtn">
                            Show Ticket
                        </Link>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default CardBooking;
