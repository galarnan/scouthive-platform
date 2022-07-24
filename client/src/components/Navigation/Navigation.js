import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from '../Players/playersSlice';

const Navigation = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (props.isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => {
            navigate('/users');
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Connections
        </p>
        <p
          onClick={() => {
            navigate('/playerrequests');
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Player Requests
        </p>
        <p
          onClick={() => {
            navigate('/myplayerrequests');
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          My Requests
        </p>
        <p
          onClick={() => {
            dispatch(reset());
            navigate('/');
            props.authentication(false);
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => navigate('/')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => navigate('/register')}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
