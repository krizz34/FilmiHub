import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Navbar from "../Navbar/Navbar";
import checkAuth from "../Authenticate/CheckAuth";


function EditPost() {

    const {postId} = useParams();

    const [movieName, setMovieName] = useState('');
    const [movieDesc, setMovieDesc] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieCost, setMovieCost] = useState('');
    const [movieTime, setMovieTime] = useState('');
    const [movieFromDate, setMovieFromDate] = useState('');
    const [movieEndDate, setMovieEndDate] = useState('');

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/adminHub/APIreadspecial/${postId}/`, {
            headers: { 'Authorization': "token " + user.token }
          }).then(response=>{
            setMovieName(response.data.movieName);
            setMovieDesc(response.data.movieDesc);
            setMovieGenre(response.data.movieGenre);
            setMovieCost(response.data.movieCost);
            setMovieTime(response.data.movieTime);
            setMovieFromDate(response.data.movieFromDate);
            setMovieEndDate(response.data.movieEndDate);            
        })
    },[postId, user]);

    function updatePost(){
        axios.put(`http://127.0.0.1:8000/adminHub/APIupdate/${postId}/`,{
            movieName: movieName,
            movieDesc: movieDesc,
            movieGenre: movieGenre,
            movieCost: movieCost,
            movieTime: movieTime,
            movieFromDate: movieFromDate,
            movieEndDate: movieEndDate,
        },
        {
            headers: { 'Authorization': "token " + user.token }
        })
        .then(response=>{
            alert(response.data.message)
        })
        .catch(error => {
            if (error.response) {
                alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                alert('No response received from the server');
            } else {
                alert('Error setting up the request');
            }
        });
        navigate('/readAPI');
    } var user = useSelector(store=>store.auth.user);
    return(
    <div className="customBg">
        <Navbar/>
        <div className="container w-50 bg-white rounded mt-5 p-3">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center" style={{ fontWeight: 'bold', color: '#eecd1d' }}>Edit Medicine</h1>
                    
                    <div className="form-group">
                            <label>Movie Name:</label>
                            <input type="text" className="form-control" value={movieName} onChange={(event) => { setMovieName(event.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea className="form-control" value={movieDesc} onChange={(event) => { setMovieDesc(event.target.value) }} rows="4" />
                        </div>
                        <div className="form-group">
                            <label>Genre:</label>
                            <input type="text" className="form-control" value={movieGenre} onChange={(event) => { setMovieGenre(event.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label>Ticket Price:</label>
                            <input type="text" className="form-control" value={movieCost} onChange={(event) => { setMovieCost(event.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label>Movie Time Slot:</label>
                            <select className="form-control" value={movieTime} onChange={(event) => { setMovieTime(event.target.value) }}>
                                <option value="" disabled>select-time-slot</option>
                                <option value="11:30 am">11:30 am</option>
                                <option value="2:30 pm">2:30 pm</option>
                                <option value="5:00 pm">5:00 pm</option>
                                <option value="9:00 pm">9:00 pm</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Screening Start Date:</label>
                            <input type="date" className="form-control" value={movieFromDate} onChange={(event) => { setMovieFromDate(event.target.value) }} pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" title="Enter a date in the format YYYY-MM-DD" />
                        </div>
                        <div className="form-group">
                            <label>Screening End Date:</label>
                            <input type="date" className="form-control" value={movieEndDate} onChange={(event) => { setMovieEndDate(event.target.value) }} pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" title="Enter a date in the format YYYY-MM-DD"  />
                        </div>

                    <div className="form-group">
                        <button className="btn btn-block customBtnClrAlt" onClick={updatePost}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default checkAuth(EditPost);