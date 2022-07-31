/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrivateOutlet = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    // send jwt to API to see if it's valid
    let token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      axios
        .post('/token', {
          jwtToken: token,
        })
        .then(res => {
          if (res === true) {
            setAuth(true);
            setisLoaded(true);
            console.log("token validated");
          }
        })
        .catch(err => {
          console.log(err)
          setAuth(false);
          localStorage.removeItem('token');
        });
    } else {
      console.log("no token");
      setAuth(false); // in case there is no token
    }
  }, []);

  if (isLoaded) {
    console.log("returning");
    return auth ? <Outlet /> : <Navigate to="/" />;
  }
};
export default PrivateOutlet;
