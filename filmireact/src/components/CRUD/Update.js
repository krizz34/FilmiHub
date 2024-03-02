import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Navbar from "../Navbar/Navbar";
import checkAuth from "../Authenticate/CheckAuth";


function EditPost() {

    const {postId} = useParams();
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    let navigate = useNavigate();
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            headers:{'Authorization':"bearer "+ user.token}
          }).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_date(response.data.expiry_date);
        })
    },[postId]);
    function updatePost(){
       

        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            name: name,
            company: company,
            expiry_date: expiry_date,
        },
        {
            headers:{'Authorization':"bearer "+ user.token}
          }).then(response=>{
            alert(response.data.message)
        })
        navigate('/readAPI');
    } var user = useSelector(store=>store.auth.user);
    return(
    <div className="customBg">
        <Navbar/>
        <div className="container w-50 bg-white rounded mt-5 p-3">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center" style={{ fontWeight: 'bold', color: '#531251' }}>Edit Medicine</h1>
                    {/* <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea className="form-control" value={content} onChange={(event)=>{setContent(event.target.value)}}/>
                    </div> */}
                    <div className="form-group">
                        <label>Medicine Name:</label>
                        <input type="text" className="form-control" value={name} onChange={(event)=>{setName(event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <textarea className="form-control" value={company} onChange={(event)=>{setCompany(event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label>Expiry:</label>
                        <input type="text" className="form-control" value={expiry_date} onChange={(event)=>{setExpiry_date(event.target.value)}}/>
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