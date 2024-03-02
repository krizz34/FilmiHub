import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import Navbar from "../Navbar/Navbar";
import checkAuth from "../Authenticate/CheckAuth";


function ViewPost() {
    var user = useSelector(store => store.auth.user);
    var {postId} = useParams()
    // var [post,setPost] = useState({title:'',content:''})
    var [post,setPost] = useState({movieName:'',movieDesc:'',movieGenre:'',movieCost:'',movieTime:'',movieFromDate:'',movieEndDate:''})

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/adminHub/APIreadspecial/${postId}/`, {
            headers: { 'Authorization': "token " + user.token }
          }).then(response=>{
            setPost(response.data)
        })
    },[postId, user]);
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {/* <div className="card-header"><h3>{post.title}</h3></div>
                        <div className="card-body">{post.content}</div> */}
                        <div className="card-header"><h3>{post.movieName}</h3></div>
                        <div className="card-body">
                                <p><strong>Genre:</strong> {post.movieGenre}</p>
                                <p><strong>Description:</strong> {post.movieDesc}</p>
                                <p><strong>Movie Screening Time:</strong> {post.movieTime}</p>
                                <p><strong>Screening Start Date:</strong> {post.movieFromDate}</p>
                                <p><strong>Screening End Date:</strong> {post.movieEndDate}</p>
                                <p><strong>Ticket Price:</strong> {post.movieCost}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(ViewPost);