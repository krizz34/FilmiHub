import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import checkAuth from "../Authenticate/CheckAuth";
import '../../global.css';



function ViewPost() {
    var user = useSelector(store => store.auth.user);
    var {postId} = useParams()
    let navigate = useNavigate();
    // var [post,setPost] = useState({title:'',content:''})
    var [post,setPost] = useState({movieName:'',movieDesc:'',movieGenre:'',movieCost:'',movieTime:'',movieFromDate:'',movieEndDate:''})
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [noOfBookings, setNoOfBookings] = useState('');
    const [seatsAvailable, setSeatsAvailable] = useState(null);


    useEffect(()=>{
        if (user) {
            axios.get(`http://127.0.0.1:8000/adminHub/APIreadspecial/${postId}/`, {
                headers: { 'Authorization': "token " + user.token }
            }).then(response => {
                setPost(response.data);
            });
        }
    },[postId, user]);

    function addBookingRecord(){
        axios.post(`http://127.0.0.1:8000/adminHub/APIcreatebooking/${postId}/`, {
            bookingDate: bookingDate,
            bookingTime: post.movieTime,
            noOfBookings: noOfBookings,
            seatsAvailable: seatsAvailable,
        }, {
            headers: { 'Authorization': "token " + user.token }
        })
        .then(response => {
            alert(response.data.message);
            navigate('/bookingDetails');
        })
        .catch(error => {
            if (error.response) {
                alert(`Error: ${error.response.data.error}`);
                console.log(error.response.data.error)
            } else if (error.request) {
                alert('No response received from the server');
            } else {
                alert('Error setting up the request');
            }
        }, [user]);
    }

    function checkAvailability() {
        axios.get(`http://127.0.0.1:8000/adminHub/APIcheckavailability/${bookingDate}/${post.movieTime}/`, {
            headers: { 'Authorization': "token " + user.token }
        })
        .then(response => {
            if (response.data.seatsAvailable !== undefined) {
                setSeatsAvailable(response.data.seatsAvailable);
            } else {
                alert(response.data.message);
                // Handle the case where the message is 'Sorry Housefull'
            }
        })
        .catch(error => {
            handleApiError(error);
        }, [user]);
    }

    function handleApiError(error) {
        if (error.response) {
            alert(`Error: ${error.response.data.error}`);
        } else if (error.request) {
            alert('No response received from the server');
        } else {
            alert('Error setting up the request');
        }
    }

    return(
        <div className="customBg">
            <Navbar />
            <div className="container w-75 bg-white rounded mt-5 p-3">
                <h1 className="text-center my-4" style={{ fontWeight: 'bold', color: '#eecd1d' }}>{post.movieName}</h1>
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card-body">
                            <p><strong>Genre:</strong> {post.movieGenre}</p>
                            <p><strong>Description:</strong> {post.movieDesc}</p>
                            <p><strong>Movie Screening Time:</strong> {post.movieTime}</p>
                            <p><strong>Screening Start Date:</strong> {post.movieFromDate}</p>
                            <p><strong>Screening End Date:</strong> {post.movieEndDate}</p>
                            <p><strong>Ticket Price:</strong> {post.movieCost}</p>
                        </div>
                        <div className="form-group">
                            <label>Booking Date:</label>
                            <input type="date" className="form-control" value={bookingDate} onChange={(event) => { setBookingDate(event.target.value) }} min={post.movieFromDate} max={post.movieEndDate}  pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" title="Enter a date in the format YYYY-MM-DD" />
                        </div>
                        <div className="form-group">
                            <label>Booking Time:</label>
                            <input type="text" className="form-control" disabled placeholder={post.movieTime} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-block customBtnClrAlt" onClick={checkAvailability}>Check Availability</button>
                        </div>
                        {typeof seatsAvailable === 'number' ? (
                            <>
                                <h6 className="gray">No. of seats available: {seatsAvailable}</h6>
                                <div className="form-group">
                                    <label>No of seats:</label>
                                    <select className="form-control" value={noOfBookings} onChange={(event) => { setNoOfBookings(event.target.value) }}>
                                        <option value="" disabled>select-seat-count</option>
                                        {seatsAvailable >= 3 ? <option value="3">3</option> : <option value="3" disabled>3</option>}
                                        {seatsAvailable >= 2 ? <option value="2">2</option> : <option value="2" disabled>2</option>}
                                        {seatsAvailable >= 1 ? <option value="1">1</option> : <option value="1" disabled>1</option>}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block customBtnClrAlt" onClick={addBookingRecord}>Submit</button>
                                </div>
                            </>
                        ) : seatsAvailable === 'Sorry! Housefull' ? (
                            <h6 className="gray" style={{ fontSize: '32px' }}>{seatsAvailable}</h6>
                        ) : (
                            <p>{seatsAvailable}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default checkAuth(ViewPost);