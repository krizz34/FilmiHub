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
    var [post,setPost] = useState({name:'',company:'',expiry_date:''})

    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            headers: { 'Authorization': "bearer " + user.token }
          }).then(response=>{
            setPost(response.data)
        })
    },[postId]);
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {/* <div className="card-header"><h3>{post.title}</h3></div>
                        <div className="card-body">{post.content}</div> */}
                        <div className="card-header"><h3>{post.name}</h3></div>
                        <div className="card-body">
                                <p><strong>Company:</strong> {post.company}</p>
                                <p><strong>Expiry:</strong> {post.expiry_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(ViewPost);