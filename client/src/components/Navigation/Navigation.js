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
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          color: '#4D4D4D',
          fontWeight: 600,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          position: 'sticky',
          backgroundColor: 'white',
          width: '100%',
          zIndex: 2,
          top: 0,
          height: '10%',
          paddingLeft: '10%',
          paddingRight: '10%',
        }}
      >
        <Logo className="" />
        <p
          onClick={() => {
            navigate('/home');
          }}
          className={`link dim pointer mb-0 mx-3 ${
            location === 'home' ? 'blue fw-bold' : ''
          }`}
        >
          Home
        </p>
        <p
          onClick={() => {
            navigate('/connections');
          }}
          className={`link dim mx-3 pointer mb-0 ${
            location === 'connections' ? 'blue fw-bold' : ''
          }`}
        >
          Connections
        </p>
        <p
          onClick={() => {
            navigate('/playerrequests');
          }}
          className={`link dim mx-3 pointer mb-0 ${
            location === 'playerrequests' ? 'blue fw-bold' : ''
          }`}
        >
          Player Requests
        </p>
        <p
          onClick={() => {
            navigate('/myplayerrequests');
          }}
          className={`link dim mx-3 pointer mb-0 ${
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
          className="link dim ms-3 pointer mb-0"
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
