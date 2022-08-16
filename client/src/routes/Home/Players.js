import React, { useEffect, useMemo, useState, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers } from './playersSlice';
import Search from './Search';
import axios from 'axios';
import './Home.css';
import ReactCountryFlag from 'react-country-flag';
import { MDBIcon } from 'mdb-react-ui-kit';

function Players() {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [filteredplayers, setfilteredplayers] = useState([]);

  const fetchStatus = useSelector(state => state.players.status);

  useMemo(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchPlayers());
    }
  }, [fetchStatus]);

  function fetch_playerdetails(playerID) {
    axios
      .post('/api/playerdetails', {
        playerID,
      })
      .then(response => response.data)
      .then(details_result =>
        navigate('/playerdetails', { state: { details: details_result } })
      )
      .catch(err => console.log(err));
  }

  const renderedPlayers = filteredplayers.map((player, key) => (
    <tr key={key}>
      <td className="relative center">
        {' '}
        <ReactCountryFlag
          style={{
            width: '2.5em',
            height: '2.5em',
          }}
          countryCode="US"
          svg
        />
      </td>
      <td style={{ paddingLeft: '2rem' }} className="w-30 text-start">
        {player.Name}
      </td>
      <td>{player.Age}</td>
      <td className="tdborder">{player.Foot[0].toUpperCase()}</td>
      <td className="tdborder">{player.Club}</td>
      <td className="tdborder">{player.Position}</td>
      <td>{player.Nationality}</td>
      <td className="w-20">
        <button
          type="button"
          onClick={() => fetch_playerdetails(player.playerID)}
          className="btn btn-primary"
        >
          See details
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="justify-content-center mx-5">
      <MDBIcon flag="France" />
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
      <table className="w-50 align-middle">
        <tbody>{renderedPlayers}</tbody>
      </table>
    </div>
  );
}

export default Players;
