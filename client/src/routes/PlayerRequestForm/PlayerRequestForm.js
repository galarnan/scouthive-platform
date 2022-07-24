import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material/';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { Slider } from '@mui/material/';
import axios from 'axios';

const PlayerRequestForm = () => {
  const userid = window.localStorage.getItem('USER_ID');
  let navigate = useNavigate();
  const [MentalAttributes, setMentalAttributes] = useState({
    Aggression: false,
    Composure: false,
    Leadership: false,
  });

  const [TechnicalAttributes, setTechnicalAttributes] = useState({
    Dribbling: false,
    Finishing: false,
    FirstTouch: false,
  });

  const [PhysicalAttributes, setPhysicalAttributes] = useState({
    Pace: false,
    Stamina: false,
    Strength: false,
  });

  const [OtherDetails, setOtherDetaisl] = useState({
    Feet: '',
    Ages: [13, 40],
    Positions: [],
  });

  function OnchangeMental(evt) {
    const value = evt.target.checked;
    setMentalAttributes({
      ...MentalAttributes,
      [evt.target.name]: value,
    });
  }

  function OnchangeTechnical(evt) {
    const value = evt.target.checked;
    setTechnicalAttributes({
      ...TechnicalAttributes,
      [evt.target.name]: value,
    });
  }

  function OnchangePhysical(evt) {
    const value = evt.target.checked;
    setPhysicalAttributes({
      ...PhysicalAttributes,
      [evt.target.name]: value,
    });
  }

  //function for multiselect inputs
  function handleChangemulti(field, evt, third) {
    console.log(evt);
    const value = evt.map(obj => obj.value);
    setOtherDetaisl({
      ...OtherDetails,
      [field]: value,
    });
  }

  function handleSlider(evt) {
    const value = evt.target.value;
    setOtherDetaisl({
      ...OtherDetails,
      [evt.target.name]: value,
    });
  }

  const addtodb = () => {
    axios
      .post('/createrequest', {
        ...MentalAttributes,
        ...PhysicalAttributes,
        ...TechnicalAttributes,
        ...OtherDetails,
        userID: userid,
        Created: new Date(),
      })
      .then(response => response.data)
      .then(player => {
        if (player) {
          navigate('/home', { replace: true });
        }
      })
      .catch(err => console.log(err));
  };

  const feet = [
    { value: 'right', label: 'right' },
    { value: 'left', label: 'left' },
    { value: 'both', label: 'both' },
  ];

  const positions = [
    { value: 'Goalkeeper', label: 'Goalkeeper' },
    { value: 'Right-Back', label: 'Right-Back' },
    { value: 'Left-Back', label: 'Left-Back' },
    { value: 'Center-Back', label: 'Center-Back' },
    { value: 'Defensive Midfield', label: 'Defensive Midfield' },
    { value: 'Central Midfield', label: 'Central Midfield' },
    { value: 'Attack Midfield', label: 'Attack Midfield' },
    { value: 'Right Winger', label: 'Right Winger' },
    { value: 'Left Winger', label: 'Left Winger' },
    { value: 'Second Striker', label: 'Second Striker' },
    { value: 'Centre-Forward', label: 'Centre-Forward' },
  ];

  const slider = (
    <Slider
      getAriaLabel={() => 'Temperature range'}
      value={OtherDetails.Ages}
      onChange={handleSlider}
      valueLabelDisplay="on"
      max={40}
      min={13}
      name="Ages"
      sx={{
        width: 200,
        color: 'white',
      }}
    />
  );

  return (
    <div className="row mx-3">
      <div className="col-sm">
        <h5 className="text-start">Mental Attributes</h5>
        <FormGroup>
          <FormControlLabel
            name="Aggression"
            onChange={OnchangeMental}
            control={<Checkbox checked={MentalAttributes.Aggression} />}
            label="Aggression"
          />
          <FormControlLabel
            name="Composure"
            onChange={OnchangeMental}
            control={<Checkbox checked={MentalAttributes.Composure} />}
            label="Composure"
          />
          <FormControlLabel
            name="Leadership"
            onChange={OnchangeMental}
            control={<Checkbox checked={MentalAttributes.Leadership} />}
            label="Leadership"
          />
        </FormGroup>
      </div>
      <div className="col-sm">
        <h5 className="text-start">Technical Attributes</h5>
        <FormGroup>
          <FormControlLabel
            name="Dribbling"
            onChange={OnchangeTechnical}
            control={<Checkbox checked={TechnicalAttributes.Dribbling} />}
            label="Dribbling"
          />
          <FormControlLabel
            name="Finishing"
            onChange={OnchangeTechnical}
            control={<Checkbox checked={TechnicalAttributes.Finishing} />}
            label="Finishing"
          />
          <FormControlLabel
            name="FirstTouch"
            onChange={OnchangeTechnical}
            control={<Checkbox checked={TechnicalAttributes.FirstTouch} />}
            label="FirstTouch"
          />
        </FormGroup>
      </div>
      <div className="col-sm">
        <h5 className="text-start">Physical Attributes</h5>
        <FormGroup>
          <FormControlLabel
            name="Pace"
            onChange={OnchangePhysical}
            control={<Checkbox checked={PhysicalAttributes.Pace} />}
            label="Pace"
          />
          <FormControlLabel
            name="Stamina"
            onChange={OnchangePhysical}
            control={<Checkbox checked={PhysicalAttributes.Stamina} />}
            label="Stamina"
          />
          <FormControlLabel
            name="Strength"
            onChange={OnchangePhysical}
            control={<Checkbox checked={PhysicalAttributes.Strength} />}
            label="Strength"
          />
        </FormGroup>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <Select
            isMulti
            onChange={handleChangemulti.bind(this, 'Feet')}
            name="Feet"
            options={feet}
            placeholder="Strong foot"
          />
        </div>
        <div className="col-md-4">
          <Select
            isMulti
            onChange={handleChangemulti.bind(this, 'Positions')}
            name="Positions"
            options={positions}
            placeholder="Main position"
          />
        </div>
        <div className="col-md-3">
          {slider}
          <label>Age</label>
        </div>
        <button className="w-10 mt-5" onClick={() => addtodb()}>
          Create
        </button>
      </div>
    </div>
  );
};

export default PlayerRequestForm;
