import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const OthersPlayerRequests = () => {
  const [PlayerRequests, setPlayerRequests] = useState([]);
  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post('/api/getplayerrequests', {
        userid: active_user,
      })
      .then(response => response.data)
      .then(requests => setPlayerRequests(requests));
  }, []);

  const RequestDetails = request => {
    navigate('/requestdetails', {
      state: { details: request },
    });
  };

  return (
    <div className="row">
      <h2>Requests from connections</h2>
      {PlayerRequests.map((request, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-subtitle mb-2 text-muted">
                {`${request.Feet.slice(2, -2)} footed ${request.Positions.slice(2, -2)}`}
              </h5>
              <h6 className="card-title">{`Posted by ${request.name} on ${request.Created.slice(0, 10)}`}</h6>
              <p></p>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => RequestDetails(request)}
              >
                Details
              </button>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default OthersPlayerRequests;
