
// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// function PostListItem(props) {
//     const user = useSelector(store => store.auth.user);
//     const [showModal, setShowModal] = useState(false);

//     const handleShow = () => setShowModal(true);
//     const handleClose = () => setShowModal(false);

//     function deletePost() {
//         axios.delete(`http://127.0.0.1:8000/adminHub/APIdelete/${props.post.id}/`, {
//             headers: { 'Authorization': "token " + user.token }
//         }).then(response => {
//             alert(response.data.message)
//             props.refresh();
//             handleClose();
//         })
//     }


//     return (
//         <div className="card">
//             <div className="card-body">
//                 {props.post.movieName}
//                 <button className="btn btn-danger btn-sm float-right m-1 border-0" style={{ backgroundColor: '#000000', color: '#d71129' }} onClick={handleShow}>
//                     <FontAwesomeIcon icon={faTrashAlt} />
//                 </button>
//                 <Link to={`/updateAPI/${props.post.id}/edit`} className="btn btn-primary btn-sm float-right m-1 border-0" style={{ backgroundColor: '#000000', color: '#808080' }}>
//                     <FontAwesomeIcon icon={faPencilAlt} />
//                 </Link>
//                 <Link to={`/viewAPI/${props.post.id}`} className="btn btn-info btn-sm float-right m-1 border-0" style={{ backgroundColor: '#000000', color: '#eecd1d'}}>
//                     <FontAwesomeIcon icon={faEye} />
//                 </Link>
//             </div>

//             <div className={`modal fade ${showModal ? 'show' : ''}`} id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="confirmationModalLabel">Confirm Delete</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
//                         </div>
//                         <div className="modal-body">
//                             Are you sure you want to delete this item?
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancel</button>
//                             <button type="button" className="btn btn-danger" onClick={deletePost}>Delete</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {showModal && <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)' }}></div>}
//         </div>
//     )
// }

// export default PostListItem;



import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './Card.css';
import sampleMovieImage from './tempMovie.png';


function MovieCard(props) {
    const user = useSelector(store => store.auth.user);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    function deleteMovie() {
        axios.delete(`http://127.0.0.1:8000/adminHub/APIdelete/${props.post.id}/`, {
            headers: { 'Authorization': "token " + user.token }
        }).then(response => {
            alert(response.data.message);
            props.refresh();
            handleClose();
        })
    }

    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <img src={props.post.movieImage} className="card-img" alt="Movie Poster" />
                <div className="card-body">
                    <div className="clearfix mb-3">
                        <span className="float-start badge rounded-pill bg-success">₹ {props.post.movieCost}</span>
                    </div>
                    <h5 className="card-title">{props.post.movieName}</h5>
                    <p className="card-text" style={{ marginTop: '-40px' }}>{props.post.movieDesc}</p>
                    <div className="text-center">
                        <Link to={`/viewAPI/${props.post.id}`} className="btn btn-block mb-2 bookNowBtn">
                            Book Now
                        </Link>
                    </div>
                </div>

                <div className={`modal fade ${showModal ? 'show' : ''}`} id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="confirmationModalLabel">Confirm Delete</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this item?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={deleteMovie}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)' }}></div>}
            </div>
        </div>
    );
}

export default MovieCard;
