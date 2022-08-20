import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UsersList = () => {
  const [users, setUserList] = useState([]);
  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);

  useEffect(() => {
    axios
      .post('/api/connections', {
        userid: active_user,
      })
      .then(response => setUserList(response.data));
  }, []);

  const add_friend = (userid, e) => {
    axios
      .post('/api/userspage_addfriend', {
        user_sent: active_user,
        user_received: userid,
        status: 'Pending',
      })
      .then(response => {
        if (response.data) {
          e.target.className = 'btn btn-secondary disabled';
          e.target.innerHTML = 'Request Sent';
        }
      });
  };

  return (
    <div className="row">
      {users.map((user, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{user.type}</h6>
              <button
                type="button"
                className="btn btn-light"
                onClick={add_friend.bind(this, user.id)}
              >
                Connect
              </button>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default UsersList;
