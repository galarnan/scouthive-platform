import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersList = () => {
  const [users, setUserList] = useState([]);
  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);

  useEffect(() => {
    fetch('http://localhost:3000/users', {
      method: 'get',
    })
      .then(response => response.json())
      .then(users => setUserList(users));
  }, []);

  const add_friend = userid => {
    fetch('http://localhost:3000/userspage_addfriend', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_sent: active_user,
        user_received: userid,
        status: 'Pending',
      }),
    }).then(response => response.json());
  };

  return (
    <div>
      {users.map((user, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Agent/Scout</h6>
              <button
                type="button"
                className="btn btn-light"
                onClick={add_friend.bind(this, user.id)}
              >
                Add friend
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
