import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FriendRequests = () => {
  const [friend_requests, setFriend_Requests] = useState([]);
  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);

  useEffect(() => {
    fetch('http://localhost:3000/userspage_getfriendrequests', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: active_user,
      }),
    })
      .then(response => response.json())
      .then(requests => setFriend_Requests(requests));
  }, []);

  const accept_friend = userid => {
    fetch('http://localhost:3000/userspage_acceptfriend', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_sent: userid,
        user_received: active_user,
      }),
    }).then(response => response.json());
  };

  return (
    <div>
      {friend_requests.map((request, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-title">{request.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Agent/Scout</h6>
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
