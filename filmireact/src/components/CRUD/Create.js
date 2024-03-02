import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Navbar from "../Navbar/Navbar";
import checkAuth from "../Authenticate/CheckAuth";

function CreatePost() {
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');

    function addPost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiry_date,
        }, {
            headers: { 'Authorization': "bearer " + user.token }
        }).then(response => {
            alert(response.data.message);
            navigate('/readAPI');
        })
    }

    return (
        <div className="customBg">
            <Navbar />
            <div className="container w-50 bg-white rounded mt-5 p-3">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center" style={{ fontWeight: 'bold', color: '#531251' }}>New Medicine</h1>
                        <div className="form-group">
                            <label>Medicine Name:</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => { setName(event.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <input type="text" className="form-control" value={company} onChange={(event) => { setCompany(event.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label>Expiry:</label>
                            <input type="text" className="form-control" value={expiry_date} onChange={(event) => { setExpiry_date(event.target.value) }} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-block customBtnClrAlt" onClick={addPost}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default checkAuth(CreatePost);
