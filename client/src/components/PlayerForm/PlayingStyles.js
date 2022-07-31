import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material/';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addplayer } from '../Players/playersSlice';
import axios from 'axios';

function PlayingStyles(props) {
  const userid = window.localStorage.getItem('USER_ID');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const Onchange = props.Onchange;
  const values = props.values;

  const addtodb = () => {
    axios
      .post('/addplayer', {
        ...values,
        userid: userid,
      })
      .then(response => response.data)
      .then(player => {
        if (player) {
          dispatch(addplayer(player));
          navigate('/home', { replace: true });
        }
      })
      .catch(err => console.log(err));
  };

  const Previous = e => {
    e.preventDefault();
    props.prevStep();
  };

  const Position = pos => {
    if (pos.includes('midfield')) {
      return (
        <FormGroup>
          <FormControlLabel
            name="BoxtoBox"
            onChange={Onchange}
            control={<Checkbox checked={values.BoxtoBox} />}
            label="Box-to-Box"
          />
          <FormControlLabel
            name="DeepLying"
            onChange={Onchange}
            control={<Checkbox checked={values.DeepLying} />}
            label="Deep Lying"
          />
          <FormControlLabel
            name="JoinsAttack"
            onChange={Onchange}
            control={<Checkbox checked={values.JoinsAttack} />}
            label="Joins Attack"
          />
        </FormGroup>
      );
    } else if (pos.includes('attack')) {
      return 'ATT';
    } else if (pos.includes('Defender')) {
      return 'DEF';
    } else if (pos.includes('Goalkeeper')) {
      return 'GK';
    }
  };

  return (
    <div>
      <h1 className="m-1">Playing Styles</h1>
      <div className="row mx-5">{Position(values.Position)}</div>
      <button className="w-10 mt-5" onClick={Previous}>
        Previous
      </button>
      <button className="w-10 mt-5" onClick={() => addtodb()}>
        Confirm
      </button>
    </div>
  );
}

export default PlayingStyles;
