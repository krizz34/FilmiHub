import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import './Card.css';

function MovieCard(props) {
    const user = useSelector(store => store.auth.user);
    const [totalBookings, setTotalBookings] = useState(0);

    useEffect(() => {
        if (user) {
            axios.get(`http://127.0.0.1:8000/adminHub/APIgetTotalBookings/${props.post.id}/${props.post.movieFromDate}/${props.post.movieEndDate}/${props.post.movieTime}/`, {
                headers: { 'Authorization': "token " + user.token }
            })
            .then(response => {
                setTotalBookings(response.data.totalBookings);
            })
            .catch(error => {
                console.error('Error fetching total bookings:', error);
            });
        }
    }, [props.post.id, props.post.movieFromDate, props.post.movieEndDate, props.post.movieTime, user]);


    // function getTotalNoOfBookings() {
    //     if (user && user.token) {
    //         axios.get(`http://127.0.0.1:8000/adminHub/APIgetTotalBookings/${props.post.id}/${props.post.movieDate}/`, {
    //             headers: { 'Authorization': "token " + user.token }
    //         })
    //         .then(response => {
    //             setTotalBookings(response.data.totalBookings);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching total bookings:', error);
    //         });
    //       } else {
    //         console.error('User or user token is null');
    //       }
    //       return totalBookings;
    // }

    return (
        <div className="col">
            <div className="card h-100 w-100 shadow-sm" style={{marginLeft:'-0px'}}>
                {/* <img src={props.post.movieImage} className="card-img" alt="Movie Poster" /> */}
                <div className="card-body">
                    <div className="clearfix mb-3">
                        <span className="float-start badge rounded-pill bg-success">₹ {props.post.movieCost}</span>
                    </div>
                    <h5 className="card-title">{props.post.movieName}</h5>
                    <p className="card-text" style={{ marginTop: '-40px' }}>{props.post.movieDesc}</p>
                    <h6>Total No. of Bookings: <span className="gray">{totalBookings}</span></h6>
                    <h6>Total Cost: <span className="gray">₹ {totalBookings*props.post.movieCost}</span></h6>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
