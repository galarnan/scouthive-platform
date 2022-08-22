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
    if (pos === 'CM' || pos === 'DM' || pos === 'AM') {
      return (
        <FormGroup>
          <FormControlLabel
            name="Box to Box"
            onChange={Onchange}
            control={<Checkbox checked={values['Box to Box']} />}
            label="Box-to-Box"
          />
          <FormControlLabel
            name="Deep Lying"
            onChange={Onchange}
            control={<Checkbox checked={values['Deep Lying']} />}
            label="Deep Lying"
          />
          <FormControlLabel
            name="Joins Attack"
            onChange={Onchange}
            control={<Checkbox checked={values['Joins Attack']} />}
            label="Joins Attack"
          />
          <FormControlLabel
            name="Roaming Playmaker"
            onChange={Onchange}
            control={<Checkbox checked={values['Roaming Playmaker']} />}
            label="Roaming Playmaker"
          />
        </FormGroup>
      );
    } else if (pos === 'RB' || pos === 'LB') {
      return (
        <FormGroup>
          <FormControlLabel
            name="Inverted FullBack"
            onChange={Onchange}
            control={<Checkbox checked={values['Inverted FullBack']} />}
            label="Inverted FullBack"
          />
          <FormControlLabel
            name="No Nonsense FullBack"
            onChange={Onchange}
            control={<Checkbox checked={values['No Nonsense FullBack']} />}
            label="No Nonsense FullBack"
          />
          <FormControlLabel
            name="JoinsAttack"
            onChange={Onchange}
            control={<Checkbox checked={values['Joins Attack']} />}
            label="Joins Attack"
          />
          <FormControlLabel
            name="Wing Back"
            onChange={Onchange}
            control={<Checkbox checked={values['Wing  Back']} />}
            label="Wing Back"
          />
        </FormGroup>
      );
    } else if (pos === 'LW' || pos === 'RW') {
      return (
        <FormGroup>
          <FormControlLabel
            name="Wing Back"
            onChange={Onchange}
            control={<Checkbox checked={values['Wing Back']} />}
            label="Wing Back"
          />
          <FormControlLabel
            name="Defensive Winger"
            onChange={Onchange}
            control={<Checkbox checked={values['Defensive Winger']} />}
            label="Defensive Winger"
          />
          <FormControlLabel
            name="Wide Playmaker"
            onChange={Onchange}
            control={<Checkbox checked={values['Wide Playmaker']} />}
            label="Wide Playmaker"
          />
          <FormControlLabel
            name="Inverted Winger"
            onChange={Onchange}
            control={<Checkbox checked={values['Inverted Winger']} />}
            label="Inverted Winger"
          />
        </FormGroup>
      );
    } else if (pos === 'CB') {
      return (
        <FormGroup>
          <FormControlLabel
            name="Ball Playing CB"
            onChange={Onchange}
            control={<Checkbox checked={values['Ball Playing CB']} />}
            label="Ball Playing Centre-back"
          />
          <FormControlLabel
            name="No Nonsense CB"
            onChange={Onchange}
            control={<Checkbox checked={values['No Nonsense CB']} />}
            label="No Nonsense Centre-back"
          />
          <FormControlLabel
            name="Joins Attack"
            onChange={Onchange}
            control={<Checkbox checked={values['Joins Attack']} />}
            label="Joins Attack"
          />
        </FormGroup>
      );
    } else if (pos === 'Centre-Forward' || pos === 'SS') {
      return (
        <FormGroup>
          <FormControlLabel
            name="Target Man"
            onChange={Onchange}
            control={<Checkbox checked={values['Target Man']} />}
            label="Target Man"
          />
          <FormControlLabel
            name="Poacher"
            onChange={Onchange}
            control={<Checkbox checked={values['Poacher']} />}
            label="Poacher"
          />
          <FormControlLabel
            name="Wide Playmaker"
            onChange={Onchange}
            control={<Checkbox checked={values['Wide Playmaker']} />}
            label="Wide Playmaker"
          />
          <FormControlLabel
            name="False Nine"
            onChange={Onchange}
            control={<Checkbox checked={values['False Nine']} />}
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
