import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerslist: [],
      user_route: 'main',
      playerdetails: []
    }
  }


  componentDidMount(){
    try{
        fetch('http://localhost:3000/home', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userid: this.props.userid
          })
        })
      .then(response => response.json())
      .then(players => this.setState({playerslist: players}))
    }
    catch(err){
      console.log("error in fetching players")
    }
  }

  playerdetails = (playerID) => {
    fetch('http://localhost:3000/playerdetails', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        playerID: playerID 
      })
    })
    .then(response => response.json())
    .then(details_result => this.setState({playerdetails: details_result}))
    .then(this.setState({user_route: 'details'}))
  } 
        render() {
          // if (!this.playerslist) {
          //   return (
          //     <div>
          //       <h1> No players</h1>
          //     </div>
          //   )
          // }
          
          if (this.state.user_route === 'main') {
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
                    {this.state.playerslist.map((player,key) => {
                      const {age, team, position, index, playerID} = player; 
                      return (
                        <tr key={key}>
                        <td><button type="button" onClick={this.playerdetails.bind(this, playerID)} className="btn btn-link">{player.name}</button></td>
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
          if (this.state.user_route === 'details') {
            return(
              <div>
              <h1>got into player profile!</h1>
              <button onclick="history.back()">Go Back</button>
              {this.state.playerdetails.map((detail,key) => {
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
}
  export default Players;
