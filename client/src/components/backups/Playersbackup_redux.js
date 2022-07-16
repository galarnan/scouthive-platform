import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

function Players (props) {

let navigate = useNavigate();
     
const [playerslist,setplayers] = useState([]);
// const [isSignedIn,setSignedin] = useState(true);
// const [userid,setUserId] = useState(props.userid);

useEffect (() => {
  window.localStorage.setItem('IS_LOGGED_IN', JSON.stringify(true))
  let players_storage = window.localStorage.getItem('PLAYERS')
    if (!players_storage) { //user doesn't have players in local storage
      async function fetchplayers() {
        fetch('http://localhost:3000/home', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userid: props.userid
          })
        })
        .then(response => response.json())
        .then(players => {
          setplayers(players)
          window.localStorage.setItem('PLAYERS', JSON.stringify(players))
          window.localStorage.setItem('USER_ID', JSON.stringify(props.userid))
        })
        .catch("Could not fetch players")
      }
      fetchplayers();
    }
    else {
      setplayers(JSON.parse(players_storage))
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[] //empty arguement in order to stop rerendering
)

    
    
 
  function playerdetails(playerID) {
    fetch('http://localhost:3000/playerdetails', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerID: playerID
      })
    })
      .then(response => response.json())
      .then(details_result => props.update_playerdetails(details_result))
      .then(navigate("/playerdetails", { replace: true }));
  } 

  console.log("render players")

            return(
              <div className="justify-content-center mx-4">
              <h1>Player List</h1>
              <button onClick={() => navigate('/addplayer')} type="button" className="btn btn-primary d-flex align-start-left" data-mdb-ripple-unbound="true" >+ Add Player</button>
              <table className="table table-light table-bordered align-middle">
                  <tbody>
                    <tr className="table-dark">
                        <th>Name</th>
                        <th>Age</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Index (/10)</th>
                    </tr>
                   {playerslist.map((player,key) => {
                      const {name, age, team, position, index, playerID} = player; 
                      return (
                        <tr key={key}>
                        <td><button type="button" onClick={playerdetails.bind(this, playerID)} className="btn btn-link">{name}</button></td>
                        <td>{age}</td>
                        <td>{team}</td>
                        <td>{position}</td>
                        <td>{index}</td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>
            </div>
            );
  }
          


export default Players;
