import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Register() {
    var [username, setUsername] = useState('');
    var [email, setEmail] = useState('');
    var [password1, setPassword1] = useState('');
    var [password2, setPassword2] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }
        console.log(user); // Log the user object
        axios.post('http://127.0.0.1:8000/adminHub/APIsignup/',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }
    return(
    <div className="customBg">
        <div className="container w-25 bg-white rounded mt-5 p-3">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 style={{ fontWeight: 'bold', color: '#eecd1d' }}>Sign Up</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"
                        className="form-control"
                        value={username}
                        onInput={(event)=>setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                        className="form-control"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password1}
                        onInput={(event)=>setPassword1(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password2}
                        onInput={(event)=>setPassword2(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block customBtnClrAlt" onClick={registerUser}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <p className="text-center text-light">Aready a user? <a href="/login" className="text-decoration-none" style={{ fontWeight: 'bold', color: '#000000' }}>Login</a></p>
    </div>
    )
}

export default Register;