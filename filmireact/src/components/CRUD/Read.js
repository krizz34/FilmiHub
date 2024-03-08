import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Card from "./CardUser";
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
      axios.get(`http://127.0.0.1:8000/adminHub/APIsearch/${searchTerm}/`, {
        headers: { 'Authorization': "token " + user.token }
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
      axios.get('http://127.0.0.1:8000/adminHub/APIread/', {
        headers: { 'Authorization': "token " + user.token }
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
      <div className="container w-75 bg-white rounded mt-5 p-3">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4" style={{ fontWeight: 'bold', color: '#eecd1d' }}>Movie List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <div style={{ display: 'flex',alignItems: 'flex-start' }}>
                {/* <Link to="/createAPI" className="btn customBtnClrAlt mb-2" style={{ width: '30%', height: '42px', marginRight: '10px' }}>New Movie</Link> */}

                <form className="search-container" style={{ width: '100%', marginBottom: '10px' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input type="text" placeholder="Search a movie..." className="search-input" value={searchTerm} onChange={handleSearchInputChange} style={{ height: '100%', padding: '10px', boxSizing: 'border-box' }} />
                        <button className="btn btn-small customBtnClrAlt" type="button" onClick={handleSearch} style={{ position: 'absolute', right: 0, top: 0, height: '100%', borderRadius: '0 5px 5px 0', boxSizing: 'border-box' }}>
                            <FontAwesomeIcon icon={faSearch} style={{ color: '#000000' }} />
                        </button>
                    </div>
                </form>
            </div>



            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2"> {/* Adjust the number of columns based on your design */}
            {filteredPosts.length === 0 ? (
              <p>No matching medicines found.</p>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="col">
                  <Card post={post} refresh={fetchPosts} />
                </div>
              ))
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListPosts);
