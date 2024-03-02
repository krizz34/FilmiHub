// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// function PostListItem(props) {
//     const user = useSelector(store => store.auth.user);

//     function deletePost() {
//         axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
//             headers: { 'Authorization': `bearer ${user.token}` }
//         }).then(response => {
//             alert(response.data.message)
//             props.refresh()
//         })
//     }

//     return (
//         <div className="card">
//             <div className="card-body">
//                 {props.post.name}
//                 <button className="btn btn-danger btn-sm float-right m-1 border-0" style={{ backgroundColor: '#d71129' }} onClick={deletePost}>
//                     <FontAwesomeIcon icon={faTrashAlt} />
//                 </button>
//                 <Link to={`/updateAPI/${props.post.id}/edit`} className="btn btn-primary btn-sm float-right m-1 border-0" style={{ backgroundColor: '#be9865' }}>
//                     <FontAwesomeIcon icon={faPencilAlt} />
//                 </Link>
//                 <Link to={`/viewAPI/${props.post.id}`} className="btn btn-info btn-sm float-right m-1 border-0" style={{ backgroundColor: '#531251' }}>
//                     <FontAwesomeIcon icon={faEye} />
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default PostListItem;


import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function PostListItem(props) {
    const user = useSelector(store => store.auth.user);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    function deletePost() {
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
            headers: { 'Authorization': `bearer ${user.token}` }
        }).then(response => {
            alert(response.data.message)
            props.refresh();
            handleClose();
        })
    }

    return (
        <div className="card">
            <div className="card-body">
                {props.post.name}
                <button className="btn btn-danger btn-sm float-right m-1 border-0" style={{ backgroundColor: '#d71129' }} onClick={handleShow}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <Link to={`/updateAPI/${props.post.id}/edit`} className="btn btn-primary btn-sm float-right m-1 border-0" style={{ backgroundColor: '#be9865' }}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
                <Link to={`/viewAPI/${props.post.id}`} className="btn btn-info btn-sm float-right m-1 border-0" style={{ backgroundColor: '#531251' }}>
                    <FontAwesomeIcon icon={faEye} />
                </Link>
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
                            <button type="button" className="btn btn-danger" onClick={deletePost}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)' }}></div>}
        </div>
    )
}

export default PostListItem;
