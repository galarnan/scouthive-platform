import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { Slider } from '@mui/material/';
import { selectAllPlayers } from './playersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from './playersSlice';

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

function Search(props) {
  const [filters, setFilters] = useState({
    Name: '',
    Feet: '',
    Positions: [],
    Ages: [13, 40],
  });

  const players = useSelector(selectAllPlayers);

  function handleChange(evt) {
    const value = evt.target.value;
    setFilters({
      ...filters,
      [evt.target.name]: value,
    });
  }

  //function for multiselect inputs
  function handleChangemulti(field, evt) {
    const value = evt.map(obj => obj.value);
    setFilters({
      ...filters,
      [field]: value,
    });
  }
  let filteredplayers = players
    .filter(player => {
      return player.Name.toLowerCase().includes(filters.Name.toLowerCase());
    })
    .filter(player => {
      return filters.Feet.includes(player.Foot) || !filters.Feet.length;
    })
    .filter(player => {
      return (
        player.Position.includes(filters.Positions) || !filters.Positions.length
      );
    })
    .filter(player => {
      return player.Age >= filters.Ages[0] && player.Age <= filters.Ages[1];
    });

  const slider = (
    <Slider
      getAriaLabel={() => 'Temperature range'}
      value={filters.Ages}
      onChange={handleChange}
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

  useEffect(() => {
    props.setfilteredplayers(filteredplayers);
  }, [players, filters]);

  return (
    <div className="row text-start p-4">
      <h5>Filter</h5>
      <div className="col-md-3">
        <input
          name="Name"
          onChange={handleChange}
          value={filters.Name}
          className="form-control"
          id="inputEmail4"
          placeholder="Name"
        />
      </div>
      <div className="col-md-2">
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
      <div className="col-md-2">
        {slider}
        <label>Age</label>
      </div>
    </div>
  );
}

export default Search;
