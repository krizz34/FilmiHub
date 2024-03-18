import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import checkAuth from "../Authenticate/CheckAuth";
import '../../global.css';



function ViewAdmin() {
    var user = useSelector(store => store.auth.user);
    var {postId} = useParams()
    let navigate = useNavigate();
    var [post,setPost] = useState({movieName:'',movieDesc:'',movieGenre:'',movieImage:'',movieCost:'',movieTime:'',movieFromDate:'',movieEndDate:''})
    const [bookingDate, setBookingDate] = useState('');
    const [showDetails, setShowDetails] = useState([]);


    useEffect(()=>{
        if (user) {
            axios.get(`http://127.0.0.1:8000/adminHub/APIreadspecial/${postId}/`, {
                headers: { 'Authorization': "token " + user.token }
            }).then(response => {
                setPost(response.data);
            });
        }
    },[postId, user]);

    // function addBookingRecord(){
    //     axios.post(`http://127.0.0.1:8000/adminHub/APIcreatebooking/${postId}/`, {
    //         bookingDate: bookingDate,
    //         bookingTime: post.movieTime,
    //         noOfBookings: noOfBookings,
    //         seatsAvailable: seatsAvailable,
    //     }, {
    //         headers: { 'Authorization': "token " + user.token }
    //     })
    //     .then(response => {
    //         alert(response.data.message);
    //         navigate('/BookingRead');
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //             alert(`Error: ${error.response.data.error}`);
    //             console.log(error.response.data.error)
    //         } else if (error.request) {
    //             alert('No response received from the server');
    //         } else {
    //             alert('Error setting up the request');
    //         }
    //     }, [user]);
    // }

    const fetchShowDetails = () => {
        axios.get(`http://127.0.0.1:8000/adminHub/APIshowDetails/${postId}/${bookingDate}/`, {
            headers: { 'Authorization': "token " + user.token }
        })
        .then(response => {
            if (response.data.length > 0) {
                setShowDetails(response.data);
            } else {
                setShowDetails([]);
                alert('No booking details found for the specified date and time.');
            }
        })
        .catch(error => {
            console.error('Error fetching show details:', error);
        },[postId, bookingDate, user]);
    };


    function getTotalNoOfBookings() {
        let totalBookings = 0;
        showDetails.forEach(detail => {
            totalBookings += detail.noOfBookings;
        });
        return totalBookings;
    }

    function getTotalCost() {
        return getTotalNoOfBookings() * post.movieCost;
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
                    <div className="col-12">
                        <img src={post.movieImage} className="card-img-top" alt="Movie Poster" />
                    </div>
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
                            <button className="btn btn-block customBtnClrAlt" onClick={fetchShowDetails} >Check Show Updates</button>
                            {/* <button className="btn btn-block customBtnClrAlt" onClick={checkAvailability}>Check Show Updates</button> */}
                        </div>
                        <div className="form-group">
                            {showDetails.length > 0 && (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Booking ID</th>
                                            <th>Customer ID</th>
                                            <th>Seat Numbers</th>
                                            <th>No. of Bookings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showDetails.map(detail => (
                                            <tr key={detail.id}>
                                                <td>{detail.id}</td>
                                                <td>{detail.username}</td> {/* Access the username here */}
                                                <td>{detail.seatNumbers}</td>
                                                <td>{detail.noOfBookings}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                            )}
                        </div>
                        <div className="form-group">
                            {showDetails.length > 0 && (
                                <div className="form-group">
                                    <h6>Total No. of Bookings: <span className="gray">{getTotalNoOfBookings()}</span></h6>
                                    <h6>Total Cost: <span className="gray">₹ {getTotalCost()}</span></h6>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default checkAuth(ViewAdmin);