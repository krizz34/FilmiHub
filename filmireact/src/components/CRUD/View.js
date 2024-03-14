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
    var [post,setPost] = useState({movieName:'',movieDesc:'',movieGenre:'',movieImage:'',movieCost:'',movieTime:'',movieFromDate:'',movieEndDate:''})
    const [bookingDate, setBookingDate] = useState('');
    const [noOfBookings, setNoOfBookings] = useState('');
    const [seatsAvailable, setSeatsAvailable] = useState(null);
    const [selectedNoOfBookings, setSelectedNoOfBookings] = useState(null);


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
            navigate('/BookingRead');
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

    const calculateTotalAmount = () => {
        if (selectedNoOfBookings !== null) {
            return post.movieCost * selectedNoOfBookings;
        }
        return null;
    };


    // razorPay
    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
        document.body.appendChild(script);
      });
    };
  
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });



    function makePayment(e, totalAmount, movieName, user) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append('price', totalAmount);
        formData.append('product_name', movieName);
    
        async function paymentGateway() {
            try {
                
                const response = await axios.post(
                    "http://127.0.0.1:8000/adminHub/new-order/",
                    formData
                );
                const res = response.data;
                return res;

            } catch (error) {
                console.error('Error making payment gateway request:', error);
                throw error;
            }
        }
    
        paymentGateway(user).then((res) => {
            // _________ call razorpay gateway ________
            var options = {
                "key": res.razorpay_key,
                "amount": res.order.amount,
                "currency": res.order.currency,
                "callback_url": res.callback_url,
                prefill: {
                    "email": "nosob88243@xitudy.com",
                    "contact": "1234567890"
                },
                "name": res.product_name,
                "order_id": res.order.id,
            };
    
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        });
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
                            <button className="btn btn-block customBtnClrAlt" onClick={checkAvailability}>Check Availability</button>
                        </div>
                        {typeof seatsAvailable === 'number' ? (
                            <>
                                <h6 className="gray">No. of seats available: {seatsAvailable}</h6>
                                <div className="form-group">
                                    <label>No of seats:</label>
                                    <select className="form-control" value={noOfBookings} onChange={(event) => { setNoOfBookings(event.target.value); setSelectedNoOfBookings(event.target.value); }}>
                                        <option value="" disabled>select-seat-count</option>
                                        {seatsAvailable >= 3 ? <option value="3">3</option> : <option value="3" disabled>3</option>}
                                        {seatsAvailable >= 2 ? <option value="2">2</option> : <option value="2" disabled>2</option>}
                                        {seatsAvailable >= 1 ? <option value="1">1</option> : <option value="1" disabled>1</option>}
                                    </select>
                                </div>
                                {selectedNoOfBookings !== null && (
                                    <div className="form-group">
                                        <p>Total amount: {calculateTotalAmount()}</p>
                                    </div>
                                )}
                                <div className="form-group">
                                    <button className="btn btn-block customBtnClr" onClick={e=>{makePayment(e, calculateTotalAmount(), post.movieName)}}>Proceed to Payment</button>
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