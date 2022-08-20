import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FriendRequests = () => {
  const [friend_requests, setFriend_Requests] = useState([]);
  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);

  useEffect(() => {
    axios
      .post('/api/userspage_getfriendrequests', {
        userid: active_user,
      })
      .then(response => response.data)
      .then(requests => setFriend_Requests(requests));
  }, []);

  const accept_friend = (userid, e) => {
    axios
      .post('/api/userspage_acceptfriend', {
        user_sent: userid,
        user_received: active_user,
      })
      .then(response => {
        if (response.data) {
          e.target.className = 'btn btn-success disabled';
          e.target.innerHTML = 'Added';
        }
      });
  };

  return (
    <div className="row">
      {friend_requests.map((request, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-title">{request.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{request.type}</h6>
              <button
                type="button"
                className="btn btn-light"
                onClick={accept_friend.bind(this, request.id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default FriendRequests;
