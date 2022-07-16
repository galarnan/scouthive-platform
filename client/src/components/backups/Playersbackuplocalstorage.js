import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

function Players (props) {

let navigate = useNavigate();
     
// const [playerslist,setplayers] = useState([]);
// const [isSignedIn,setSignedin] = useState(true);

const [userid,setUserId] = useState(props.userid);
if ( userid !== null ) {
  window.localStorage.setItem('USER_ID', JSON.stringify(userid));}
else {
  const userid = (window.localStorage.getItem('USER_ID'))
  setUserId(JSON.parse(userid));}

var playerslist = [];
function build_playerlist(list) {
  list
  console.log("got" + list)
}
 
function isfirstenter () {
  const playerlist_storage = (window.localStorage.getItem('PLAYERS'))
  if (JSON.parse(playerlist_storage)) {
    return true
  }
  else {
    return false
  }
}

async function fetchplayers() {
  fetch('http://localhost:3000/home', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userid: userid
    })
  })
  .then(response => response.json())
  .then(players => build_playerlist(players))
  .then(window.localStorage.setItem('PLAYERS', JSON.stringify(playerslist)))
  .catch("Could not fetch players")
  }

if (isfirstenter()) {
  console.log("playerlist empty in storage");
  // users first enter
  fetchplayers();
  console.log(playerslist)
}

  else {;
    console.log("playerlist NOT empty in storage");
    // user reenters and can use local storage
    const playerlist_storage = window.localStorage.getItem('PLAYERS');
    build_playerlist(JSON.parse(playerlist_storage))

  }
    
    
 
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


            return(
              <div>
              <h1 className="tc">Player List</h1>
              <table className="table table-light table-bordered w-90">
                  <tbody>
                    <tr className="table-dark">
                        <th>Name</th>
                        <th>Age</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Index (/10)</th>
                        <th></th>
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
