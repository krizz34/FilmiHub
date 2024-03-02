import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [password_confirmation, setPassword_confirmation] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }
        axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
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
        <Navbar/>
        <div className="container w-50 bg-white rounded mt-5 p-3">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 style={{ fontWeight: 'bold', color: '#531251' }}>Sign Up</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"
                        className="form-control"
                        value={name}
                        onInput={(event)=>setName(event.target.value)}
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
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password_confirmation}
                        onInput={(event)=>setPassword_confirmation(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block customBtnClrAlt" onClick={registerUser}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <p className="text-center text-light">Aready a user? <a href="/login" className="text-decoration-none" style={{ fontWeight: 'bold', color: '#ffda9c' }}>Login</a></p>
    </div>
    )
}

export default Register;