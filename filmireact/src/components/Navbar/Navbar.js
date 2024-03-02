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
  function logout(){
      if(user){
          axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
            headers:{'Authorization':"Token "+ user.token}
          });
          dispatch(removeUser());
          navigate('/login');
        }
  }
   const location = useLocation()
   const isNavbar = location.pathname === '/login'
   if (isNavbar){
    return null;
   }
   else{
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white customNavbar" style={{ maxWidth: '573px', margin: '0 auto', borderRadius: '30px' }}>
        <NavLink to="/" className={'navbar-brand'+(({isActive})=>(isActive?'active':''))}>
          <img src={logo} alt="logo of PharamLore" className="img-fluid customNavBrand" style={{ maxHeight: '25px', marginTop: '-6px' }} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ">
            <li className="nav-item customNavItem">
              <NavLink to={"/readAPI"} className={ 'nav-link font-weight-bold customNavItem'+(status => status.isActive ? 'active' : '')} style={{ color: '#531251' }}>
                  Medicines
              </NavLink>
            </li>
            <li className="nav-item customNavItem">
              <NavLink to={"/createAPI"} className={ 'nav-link font-weight-bold customNavItem'+(status => status.isActive ? 'active' : '')} style={{ color: '#531251' }}>
                  Add New Medicine
              </NavLink>
            </li>
            <li className="nav-item customNavItem">
              <NavLink to={"/aboutus"} className={ 'nav-link font-weight-bold customNavItem'+(status => status.isActive ? 'active' : '')} style={{ color: '#531251' }}>
                      About us
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link font-weight-bold customNavItem" href="/" style={{ color: '#531251' }}>Contact Us</a>
            </li> */}
  
            
  
          </ul>
  
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle customNavItem" href="#" role="button" data-toggle="dropdown" aria-expanded="false" style={{ color: '#531251' }}>
                <FontAwesomeIcon icon={faCircleUser} />
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-end">
                
  
  
              {user ?
                <li className="dropdown-item">
                    <NavLink onClick={logout} className={'nav-link ' + (status => status.isActive ? 'active' : '')} >
                        Logout
                    </NavLink>
                </li> :
                <>
                  <li className="dropdown-item">
                      <NavLink to={"/register"} className={'nav-link ' + (status => status.isActive ? 'active' : '')} >
                          Register
                      </NavLink>
                  </li>
                  <li className="dropdown-item">
                      <NavLink to={"/login"} className={'nav-link ' + (status => status.isActive ? 'active' : '')} >
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

