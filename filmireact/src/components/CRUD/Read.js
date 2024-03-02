// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';

// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import Card from "./Card";
// import checkAuth from "../Authenticate/CheckAuth";

// function ListPosts() {
//   var user = useSelector(store => store.auth.user);
//   var [posts, setPosts] = useState([]);

//   const [filteredPosts, setFilteredPosts] = useState([]); 
//   const [SearchTerm, setSearchTerm] = useState("");

//   const handleSearchInputChange = (event) => {
//     event.preventDefault();
//     setSearchTerm(event.target.value);
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     if (SearchTerm.trim() === "") {
//       setFilteredPosts(posts);
//     }
//     else {
//       var filteredItems = posts.filter((item) =>
//         item.title.toLowerCase().includes(SearchTerm.toLowerCase())
//       );
//       setFilteredPosts(filteredItems);
//     }
//   };


//   function fetchPosts() {
//     if (user && user.token) {
//       axios
//         .get('https://medicalstore.mashupstack.com/api/medicine', {
//           headers: { 'Authorization': "bearer " + user.token }
//         })
//         .then(response => {
//           setPosts(response.data);
//           setFilteredPosts(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching posts:', error);
//         });
//     } else {
//       console.error('User or user token is null');
//     }
//   }

//   useEffect(() => {
//     fetchPosts();
//   }, [user]);

//   return (
//     <div className="customBg">
//       <Navbar />
//       <div className="container w-50 bg-white rounded mt-5 p-3">
//         <div className="row">
//           <div className="col-12">
//             <h1 className="text-center my-4" style={{ fontWeight: 'bold', color: '#531251' }}>Medicine List</h1>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-8 offset-2">
//             <Link to="/createAPI" className="btn customBtnClrAlt mb-2">Add Medicine</Link>

//             <form>
//               <label>Search Blog: </label>
//               <input type="text" value={SearchTerm} onChange={handleSearchInputChange} />{" "} &nbsp;
//               <button className="btn btn-small customBtnClrAlt" type="button" onClick={handleSearch}> Search </button> &nbsp;
//             </form>

//             {filteredPosts.length === 0 ? (
//               <p>No matching posts found.</p>
//             ) : (
//               filteredPosts.map((post) => (
//                 <Card key={post.id} post={post} refresh={fetchPosts} />
//               ))
//             )}

//             {posts.map(post => <Card key={post.id} post={post} refresh={fetchPosts} />)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ListPosts;


import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Card from "./Card";
import checkAuth from "../Authenticate/CheckAuth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function ListPosts() {
  const user = useSelector(store => store.auth.user);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);
    if (searchTermValue.trim() === ""){
      setFilteredPosts(posts);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      fetchPosts();
    } else {
      setFilteredPosts(posts);
    }
  };

  function fetchPosts() {
    if (user && user.token) {
      axios.get(`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${searchTerm}`, {
        headers: { 'Authorization': "bearer " + user.token }
      })
      .then(response => {
        setFilteredPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
    } else {
      console.error('User or user token is null');
    }
  }

  useEffect(() => {
    if (user && user.token) {
      axios.get('https://medicalstore.mashupstack.com/api/medicine', {
        headers: { 'Authorization': "bearer " + user.token }
      })
      .then(response => {
        setPosts(response.data);
        // Show all items by default
        setFilteredPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching all posts:', error);
      });
    } else {
      console.error('User or user token is null');
    }
  }, [user]);

  return (
    <div className="customBg">
      <Navbar />
      <div className="container w-50 bg-white rounded mt-5 p-3">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4" style={{ fontWeight: 'bold', color: '#531251' }}>Medicine List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <div style={{ display: 'flex',alignItems: 'flex-start' }}>
                <Link to="/createAPI" className="btn customBtnClrAlt mb-2" style={{ width: '30%', height: '42px', marginRight: '10px' }}>Add Medicine</Link>

                <form className="search-container" style={{ width: '70%' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input type="text" placeholder="Search Medicine" className="search-input" value={searchTerm} onChange={handleSearchInputChange} style={{ height: '100%', padding: '10px', boxSizing: 'border-box' }} />
                        <button className="btn btn-small customBtnClrAlt" type="button" onClick={handleSearch} style={{ position: 'absolute', right: 0, top: 0, height: '100%', borderRadius: '0 5px 5px 0', boxSizing: 'border-box' }}>
                            <FontAwesomeIcon icon={faSearch} style={{ color: 'white' }} />
                        </button>
                    </div>
                </form>
            </div>



            

            {filteredPosts.length === 0 ? (
              <p>No matching medicines found.</p>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPosts;
