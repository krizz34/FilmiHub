// Import necessary libraries and components
import './navbar.css';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../Redux/Slice';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  var user = useSelector(store=>store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    if(user) {
      axios.post('http://127.0.0.1:8000/adminHub/APIlogout/', {}, {
        headers: { 'Authorization': "token " + user.token }
      });
      dispatch(removeUser());
      navigate('/login');
    }
  }

  const location = useLocation()
  const isNavbar = location.pathname === '/login'

  if (isNavbar){
    return null;
  } else {
    return (
      <nav className="navbar navbar-expand-lg bg-black customNavbar" style={{ maxWidth: '478px', margin: '0 auto', borderRadius: '30px'}}>
        <NavLink to="/" className={'navbar-brand'+(({isActive})=>(isActive?'active':''))}>
          <img src={logo} alt="logo of PharamLore" className="img-fluid customNavBrand" style={{ maxHeight: '25px', marginTop: '-6px' }} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ color: '#eecd1d'}}></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ">
            <li className="nav-item customNavItem">
              <NavLink to={"/readAPI"} className={ 'nav-link font-weight-bold customNavItem'+(status => status.isActive ? 'active' : '')} style={{ color: '#eecd1d' }}>
                  Movies
              </NavLink>
            </li>
            <li className="nav-item customNavItem">
              <NavLink to={"/createAPI"} className={ 'nav-link font-weight-bold customNavItem'+(status => status.isActive ? 'active' : '')} style={{ color: '#eecd1d' }}>
                  Add New Movie
              </NavLink>
            </li>
            <li className="nav-item customNavItem">
              <NavLink to={"/aboutus"} className={ 'nav-link font-weight-bold customNavItem'+(status => status.isActive ? 'active' : '')} style={{ color: '#eecd1d' }}>
                      About us
              </NavLink>
            </li>
          </ul>
  
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle customNavItem" href="#" role="button" data-toggle="dropdown" aria-expanded="false" style={{ color: '#eecd1d' }}>
                <FontAwesomeIcon icon={faCircleUser} />
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-end" style={{ backgroundColor: 'white' }}>
                {user ?
                  <li className="dropdown-item">
                      <NavLink onClick={logout} className={'nav-link ' + (status => status.isActive ? 'active' : '')} style={{ color: '#eecd1d' }} >
                          Logout
                      </NavLink>
                  </li> :
                  <>
                    <li className="dropdown-item">
                        <NavLink to={"/register"} className={'nav-link ' + (status => status.isActive ? 'active' : '')} style={{ color: '#eecd1d' }} >
                            Register
                        </NavLink>
                    </li>
                    <li className="dropdown-item">
                        <NavLink to={"/login"} className={'nav-link ' + (status => status.isActive ? 'active' : '')} style={{ color: '#eecd1d' }} >
                            Login
                        </NavLink>
                    </li>
                  </>
                }
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
