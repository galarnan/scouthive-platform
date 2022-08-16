import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from '../../routes/Home/playersSlice';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

const Navigation = props => {
  let location = useLocation().pathname.slice(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (props.isSignedIn) {
    return (
      <nav
        className="p-4"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          color: '#4D4D4D',
          fontWeight: 600,
        }}
      >
        <p
          onClick={() => {
            navigate('/home');
          }}
          className={`f4 link dim pa3 pointer ${
            location === 'home' ? 'blue fw-bold' : ''
          }`}
        >
          Home
        </p>
        <p
          onClick={() => {
            navigate('/connections');
          }}
          className={`f4 link dim pa3 pointer ${
            location === 'connections' ? 'blue fw-bold' : ''
          }`}
        >
          Connections
        </p>
        <p
          onClick={() => {
            navigate('/playerrequests');
          }}
          className={`f4 link dim pa3 pointer ${
            location === 'playerrequests' ? 'blue fw-bold' : ''
          }`}
        >
          Player Requests
        </p>
        <p
          onClick={() => {
            navigate('/myplayerrequests');
          }}
          className={`f4 link dim pa3 pointer ${
            location === 'myplayerrequests' ? 'blue fw-bold' : ''
          }`}
        >
          My Requests
        </p>
        <p
          onClick={() => {
            dispatch(reset());
            navigate('/');
            props.authentication(false);
          }}
          className="f4 link dim pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    //navbar empty if logged out, div needed to keep proportions of html
    return <div style={{ height: 120 }}></div>;
  }
};

export default Navigation;
