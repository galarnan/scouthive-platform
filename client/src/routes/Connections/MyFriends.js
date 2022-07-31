import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const MyPlayers = () => {
  const [MyPlayers, setMyPlayers] = useState([]);
  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);

  useEffect(() => {
    axios
      .post('/myplayers', {
        userid: active_user,
      })
      .then(response => setMyPlayers(response.data));
  }, []);

  return (
    <div className="row">
      {MyPlayers.map((friend, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-title">{friend.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Agent/Scout</h6>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default MyPlayers;
