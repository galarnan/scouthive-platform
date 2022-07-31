import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const MyPlayerRequests = () => {
  const [PlayerRequests, setPlayerRequests] = useState([]);
  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);

  useEffect(() => {
    axios
      .post('/api/myplayerrequests', {
        userid: active_user,
      })
      .then(response => response.data)
      .then(requests => setPlayerRequests(requests));
  }, []);

  console.log(PlayerRequests);

  return (
    <div className="row">
      <h2>My requests</h2>
      {PlayerRequests.map((request, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-subtitle mb-2 text-muted">
                {`${request.Feet.slice(2, -2)} footed ${request.Positions.slice(2, -2)}`}
              </h5>
              <h6 className="card-title">{`Posted on ${request.Created.slice(0, 10)}`}</h6>
              <p></p>
              <button
                type="button"
                className="btn btn-light"
                // onClick={() => RequestDetails(request)}
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

export default MyPlayerRequests;
