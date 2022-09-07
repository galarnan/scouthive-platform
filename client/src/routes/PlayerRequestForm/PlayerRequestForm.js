/* eslint-disable prettier/prettier */
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
    'Composure': false,
    'Leadership': false,
    'Vision': false,
    'Decision Making': false,
  });

  const [TechnicalAttributes, setTechnicalAttributes] = useState({
    'Dribbling': false,
    'Finishing': false,
    'First Touch': false,
    'Ball Control': false,
    'Short Passing': false,
    'Long Passing': false,
    'Freekick Taking': false,
  });

  const [Roles, setRoles] = useState({
    'Box to Box': false,
    'Joins Attack': false,
    'Deep Lying': false,
    'Ball Playing CB': false,
    'No Nonsense CB': false,
    'Wing Back': false,
    'No Nonsense FullBack': false,
    'Inverted FullBack': false,
    'Advanced Playmaker': false,
    'Roaming Playmaker': false,
    'Defensive Winger': false,
    'Wide Playmaker': false,
    'Inverted Winger': false,
    'Target Man': false,
    'Poacher': false,
    'False Nine': false,
  });

  const [PhysicalAttributes, setPhysicalAttributes] = useState({
    'Pace': false,
    'Stamina': false,
    'Strength': false,
    'Tackling': false,
    'Aggression': false,
    'Heading': false,
  });

  const [OtherDetails, setOtherDetails] = useState({
    Foot: 'irrelevant',
    Ages: [13, 40],
    Positions: [],
  });

  function OnchangeRoles(evt) {
    const value = evt.target.checked;
    setRoles({
      ...Roles,
      [evt.target.name]: value,
    });
  }

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
    setOtherDetails({
      ...OtherDetails,
      [field]: value,
    });
  }

  function handleSlider(evt) {
    const value = evt.target.value;
    setOtherDetails({
      ...OtherDetails,
      [evt.target.name]: value,
    });
  }

  const addtodb = () => {
    axios
      .post('/api/createrequest', {
        ...Roles,
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
          navigate('/myplayerrequests', { replace: true });
        }
      })
      .catch(err => console.log(err));
  };

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

  //creating array of FormControlLabel elements for all attributes (mental, technical and physical)

  const mentalJsx = Object.entries(MentalAttributes).map(entry => {
    return (
      // eslint-disable-next-line react/jsx-key
      <FormControlLabel
        name={entry[0]}
        onChange={OnchangeMental}
        control={<Checkbox checked={entry[1]} />}
        label={entry[0]}
      />
    );
  });

  const technicalJsx = Object.entries(TechnicalAttributes).map(entry => {
    return (
      // eslint-disable-next-line react/jsx-key
      <FormControlLabel
        name={entry[0]}
        onChange={OnchangeTechnical}
        control={<Checkbox checked={entry[1]} />}
        label={entry[0]}
      />
    );
  });

  const physicalJsx = Object.entries(PhysicalAttributes).map(entry => {
    return (
      // eslint-disable-next-line react/jsx-key
      <FormControlLabel
        name={entry[0]}
        onChange={OnchangePhysical}
        control={<Checkbox checked={entry[1]} />}
        label={entry[0]}
      />
    );
  });

  const rolesJsx = Object.entries(Roles).map(entry => {
    return (
      // eslint-disable-next-line react/jsx-key
      <FormControlLabel
        name={entry[0]}
        onChange={OnchangeRoles}
        control={<Checkbox checked={entry[1]} />}
        label={entry[0]}
      />
    );
  });

  console.log(mentalJsx);

  return (
    <div className="row mx-3">
      <div className="col-sm">
        <h5 className="text-start">Mental Attributes</h5>
        <FormGroup>{mentalJsx}</FormGroup>
      </div>
      <div className="col-sm">
        <h5 className="text-start">Technical Attributes</h5>
        <FormGroup>{technicalJsx}</FormGroup>
      </div>
      <div className="col-sm">
        <h5 className="text-start">Physical Attributes</h5>
        <FormGroup>{physicalJsx}</FormGroup>
      </div>
      <div className="col-sm">
        <h5 className="text-start">Roles</h5>
        <FormGroup>{rolesJsx}</FormGroup>
      </div>
      <div className="row mt-5">
        <div className="text-start my-4 vstack">
          <label>Strong foot</label>
          <select
            className="form-select"
            value={OtherDetails.Foot}
            onChange={handleSlider}
            name="Foot"
          >
            <option value="irrelevant">irrelevant</option>
            <option value="right">right</option>
            <option value="left">left</option>
            <option value="both">both</option>
          </select>
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
