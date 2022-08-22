import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from '../../routes/Home/playersSlice';
import Logo from '../Logo/Logo';
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
        className="f5 p-4 pb-0 relative"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          color: '#4D4D4D',
          fontWeight: 600,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Logo className="pa3" />
        <p
          onClick={() => {
            navigate('/home');
          }}
          className={`link dim pa3 pointer ${
            location === 'home' ? 'blue fw-bold' : ''
          }`}
        >
          Home
        </p>
        <p
          onClick={() => {
            navigate('/connections');
          }}
          className={`link dim pa3 pointer ${
            location === 'connections' ? 'blue fw-bold' : ''
          }`}
        >
          Connections
        </p>
        <p
          onClick={() => {
            navigate('/playerrequests');
          }}
          className={`link dim pa3 pointer ${
            location === 'playerrequests' ? 'blue fw-bold' : ''
          }`}
        >
          Player Requests
        </p>
        <p
          onClick={() => {
            navigate('/myplayerrequests');
          }}
          className={`link dim pa3 pointer ${
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
          className="link dim pa3 pointer"
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
