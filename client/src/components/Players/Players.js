import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers } from './playersSlice';
import Search from './Search/Search';
import axios from 'axios';

function Players(props) {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [filteredplayers, setfilteredplayers] = useState([]);

  const fetchStatus = useSelector(state => state.players.status);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchPlayers());
    }
  }, [fetchStatus, dispatch]);

  function fetch_playerdetails(playerID) {
    axios
      .post('/playerdetails', {
        playerID: playerID,
      })
      .then(response => response.data)
      .then(details_result =>
        navigate('/playerdetails', { state: { details: details_result } })
      )
      .catch(err => console.log(err));
  }

  const renderedPlayers = filteredplayers.map((player, key) => (
    <tr key={key}>
      <td>
        <button
          type="button"
          onClick={fetch_playerdetails.bind(this, player.playerID)}
          className="btn btn-link"
        >
          {player.Name}
        </button>
      </td>
      <td>{player.Age}</td>
      <td>{player.Foot}</td>
      <td>{player.Club}</td>
      <td>{player.Position}</td>
      <td>{player.Nationality}</td>
    </tr>
  ));

  return (
    <div className="justify-content-center mx-5">
      <h1>Player List</h1>
      <Search setfilteredplayers={setfilteredplayers} />
      <button
        onClick={() => navigate('/createrequest')}
        type="button"
        className="btn btn-primary d-flex align-start-left mt-4"
        data-mdb-ripple-unbound="true"
      >
        + Create Request
      </button>
      <button
        onClick={() => navigate('/addplayer')}
        type="button"
        className="btn btn-primary d-flex align-start-left mt-4"
        data-mdb-ripple-unbound="true"
      >
        + Add Player
      </button>
      <table className="table table-light table-bordered align-middle">
        <tbody>
          <tr className="f6 table-dark p-5">
            <th>Name</th>
            <th>Age</th>
            <th>Foot</th>
            <th>Team</th>
            <th>Position</th>
            <th>Nationality</th>
          </tr>
          {renderedPlayers}
        </tbody>
      </table>
    </div>
  );
}

export default Players;
