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
import countries from './countries';

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
      <td className="relative">
        <ReactCountryFlag
          className="flag"
          countryCode={countries[player.Nationality]}
          svg
        />
      </td>
      <td style={{ paddingLeft: '1.5rem' }} className="w-30 text-start">
        {player.Name}
      </td>
      <td>{player.Age}</td>
      <td>{player.Foot[0].toUpperCase()}</td>
      <td>{player.Club}</td>
      <td>{player.Position}</td>
      <td>{player.Nationality}</td>
      <td className="w-20">
        <button
          type="button"
          onClick={() => fetch_playerdetails(player.playerID)}
          className="btn btn-primary btn-sm"
        >
          See details
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="justify-content-center mx-5">
      <Search setfilteredplayers={setfilteredplayers} />
      <button
        onClick={() => navigate('/createrequest')}
        type="button"
        className="btn btn-primary d-flex align-start-left mt-4"
        data-mdb-ripple-unbound="true"
      >
        + Create Request
      </button>
      <h5 className="text-start bold mt-4">My players</h5>
      <table className="w-50 align-middle">
        <tbody>{renderedPlayers}</tbody>
      </table>
      <p
        onClick={() => {
          navigate('/addplayer');
        }}
        className="f6 link dim pointer blue fw-bold text-start mt-1 "
      >
        Add player
      </p>
    </div>
  );
}

export default Players;
