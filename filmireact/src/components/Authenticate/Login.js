import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slice";
import Navbar from "../Navbar/Navbar";
import '../../App.css';
import checkGuest from "./CheckGuest";


function Login() {
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/adminHub/APIlogin/',{
            username:username,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                username:username,
                token:response.data.token
            }
            dispatch(setUser(user));
            navigate("/")

        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    
    
    
    return (<div className="customBg">
        <Navbar/>
        <div className="container w-25 bg-white rounded mt-5 p-3">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 style={{ fontWeight: 'bold', color: '#eecd1d' }}>Login</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>username:</label>
                        <input type="text"
                        className="form-control"
                        value={username}
                        onInput={(event)=>setUsername(event.target.value)}
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
                        <button className="btn btn-block customBtnClrAlt" onClick={attemptLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
        <p className="text-center text-light">New user? <a href="/register" className="text-decoration-none" style={{ fontWeight: 'bold', color: '#000000' }}>Sign Up</a> here.</p>

    </div>
    )
}

export default checkGuest(Login);