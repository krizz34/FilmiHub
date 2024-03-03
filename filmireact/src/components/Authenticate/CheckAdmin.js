import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const checkAdmin = (Component) => {
  function Wrapper(props) {
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();
    const alertShown = useRef(false);

    useEffect(() => {


      if (!(user && user.username === 'admin@FilmiHub') && !alertShown.current) {
        alert("You are not an admin");
        navigate('/');
        alertShown.current = true;
      } else {
        // console.log("User is an admin. Proceeding...");
      }
    }, [user, navigate]);

    return <Component {...props} />;
  }

  return Wrapper;
};

export default checkAdmin;
