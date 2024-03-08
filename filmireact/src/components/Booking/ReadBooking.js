import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import CardBooking from './CardBooking';  // Create BookingCard.js next
import Navbar from "../Navbar/Navbar";




function BookingRead() {
    const user = useSelector(store => store.auth.user);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (user && user.token) {
            axios.get('http://127.0.0.1:8000/adminHub/APIreadbookings/', {
              headers: { 'Authorization': "token " + user.token }
            })
            .then(response => {
              setPosts(response.data);
              // Show all items by default
              setFilteredPosts(response.data);
            })
            .catch(error => {
              console.error('Error fetching all posts:', error);
            });
          } else {
            console.error('User or user token is null');
          }
        }, [user]);

    return (
        <div className="customBg">
            <Navbar/>
            <div className="container w-75 bg-white rounded mt-5 p-3">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center my-4" style={{ fontWeight: 'bold', color: '#eecd1d' }}>Your Bookings</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2"> {/* Adjust the number of columns based on your design */}
                            {filteredPosts.map((post) => (
                                <CardBooking key={post.id} post={post} />
                            ))} 
                        </div>                    
                    </div>
                </div>
            </div>
        </div>

        
    );
}

export default BookingRead;
