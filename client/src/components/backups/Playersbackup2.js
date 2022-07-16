import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Players (props) {
     
const [playerslist,setplayers] = useState([]);
const [user_route,setroute] = useState('table');
const [details,setdetails] = useState([])


useEffect (() => {
  async function fetchplayers() {fetch('http://localhost:3000/home', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    userid: props.userid
  })
  })
  .then(response => response.json())
  .then(players => setplayers(players))
  .catch("Could not fetch players")
  }
fetchplayers();
},
[props.userid,setplayers]
);
    
 
const playerdetails = (playerID) => {
    fetch('http://localhost:3000/playerdetails', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        playerID: playerID 
      })
    })
    .then(response => response.json())
    .then(details_result => setdetails(details_result))
    .then(setroute('details'))
} 

  
          
          if (user_route==='table') {
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
          else if (user_route === 'details') {
            return(
              <div>
              <h1>got into player profile!</h1>
              <button className="previous round" onClick={props.onRouteChange}>Go Back</button>
              {details.map((detail,key) => {
                const {foot, agency, contract} = detail;
                  return(
                  <>
                  <p>{foot}</p>
                  <p>{agency}</p>
                  <p>{contract}</p>
                  </>
                  )
              })}
            </div>
            );
          }
}

export default Players;
