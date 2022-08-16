import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material/';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addplayer } from '../Home/playersSlice';
import axios from 'axios';

function PlayingStyles(props) {
  const userid = window.localStorage.getItem('USER_ID');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const Onchange = props.Onchange;
  const values = props.values;

  const addtodb = () => {
    axios
      .post('/api/addplayer', {
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
    if (pos.includes('Midfield')) {
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
          <FormControlLabel
            name="RoamingPlaymaker"
            onChange={Onchange}
            control={<Checkbox checked={values.RoamingPlaymaker} />}
            label="Roaming Playmaker"
          />
        </FormGroup>
      );
    } else if (pos.includes('Back')) {
      return (
        <FormGroup>
          <FormControlLabel
            name="InvertedFullBack"
            onChange={Onchange}
            control={<Checkbox checked={values.InvertedFullBack} />}
            label="Inverted FullBack"
          />
          <FormControlLabel
            name="NoNonsenseFullBack"
            onChange={Onchange}
            control={<Checkbox checked={values.NoNonsenseFullBack} />}
            label="No Nonsense FullBack"
          />
          <FormControlLabel
            name="JoinsAttack"
            onChange={Onchange}
            control={<Checkbox checked={values.JoinsAttack} />}
            label="Joins Attack"
          />
          <FormControlLabel
            name="WingBack"
            onChange={Onchange}
            control={<Checkbox checked={values.WingBack} />}
            label="WingBack"
          />
        </FormGroup>
      );
    } else if (pos.includes('Winger')) {
      return (
        <FormGroup>
          <FormControlLabel
            name="WingBack"
            onChange={Onchange}
            control={<Checkbox checked={values.WingBack} />}
            label="WingBack"
          />
          <FormControlLabel
            name="DefensiveWinger"
            onChange={Onchange}
            control={<Checkbox checked={values.DefensiveWinger} />}
            label="Defensive Winger"
          />
          <FormControlLabel
            name="WidePlaymaker"
            onChange={Onchange}
            control={<Checkbox checked={values.WidePlaymaker} />}
            label="Wide Playmaker"
          />
          <FormControlLabel
            name="InvertedWinger"
            onChange={Onchange}
            control={<Checkbox checked={values.InvertedWinger} />}
            label="Inverted Winger"
          />
        </FormGroup>
      );
    } else if (pos.includes('Back')) {
      return (
        <FormGroup>
          <FormControlLabel
            name="InvertedFullBack"
            onChange={Onchange}
            control={<Checkbox checked={values.InvertedFullBack} />}
            label="Inverted FullBack"
          />
          <FormControlLabel
            name="NoNonsenseFullBack"
            onChange={Onchange}
            control={<Checkbox checked={values.NoNonsenseFullBack} />}
            label="No Nonsense FullBack"
          />
          <FormControlLabel
            name="JoinsAttack"
            onChange={Onchange}
            control={<Checkbox checked={values.JoinsAttack} />}
            label="Joins Attack"
          />
          <FormControlLabel
            name="WingBack"
            onChange={Onchange}
            control={<Checkbox checked={values.WingBack} />}
            label="WingBack"
          />
        </FormGroup>
      );
    } else if (pos.includes('Forward')) {
      return (
        <FormGroup>
          <FormControlLabel
            name="TargetMan"
            onChange={Onchange}
            control={<Checkbox checked={values.TargetMan} />}
            label="Target Man"
          />
          <FormControlLabel
            name="Poacher"
            onChange={Onchange}
            control={<Checkbox checked={values.Poacher} />}
            label="Poacher"
          />
          <FormControlLabel
            name="WidePlaymaker"
            onChange={Onchange}
            control={<Checkbox checked={values.WidePlaymaker} />}
            label="Wide Playmaker"
          />
          <FormControlLabel
            name="FalseNine"
            onChange={Onchange}
            control={<Checkbox checked={values.FalseNine} />}
            label="False Nine"
          />
        </FormGroup>
      );
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
