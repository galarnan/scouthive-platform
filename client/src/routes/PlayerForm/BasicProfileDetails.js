/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../components/DatePicker/DatePicker';
import 'tachyons';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function BasicProfileDetails(props) {
  const functions = props.functions;
  const values = props.values;

  const [URL, setURL] = useState('');
  const [loading, setLoading] = useState(false);

  const onNameChange = event => {
    functions.setName(event.target.value);
  };

  const onNationalityChange = event => {
    functions.setNationality(event.target.value);
  };

  // const onBirthdateChange = (event) => {
  //   functions.setBirthdate(event.target.value)
  // }

  const onAgeChange = event => {
    functions.setAge(event.target.value);
  };

  const onClubChange = event => {
    functions.setClub(event.target.value);
  };

  const onURLChange = event => {
    setURL(event.target.value);
  };

  const onPositionChange = event => {
    functions.setPosition(event.target.value);
  };

  const Continue = e => {
    e.preventDefault();
    functions.nextStep();
  };

  const onSubmitURL = () => {
    setLoading(true);
    axios
      .post('/api/transfermarkt', {
        URL: URL,
      })
      .then(response => response.data)
      .then(data => {
        //transfermarkt sometimes doesn't include a certain field, we can check in the data[3] element which is supposed to be age (number) and find out which field pattern exists in the player profile
        if (isNaN(data[3])) {
          console.log(data);
          functions.setName(data[data.length - 1]);
          functions.setAge(data[2]);
          functions.setNationality(data[4]);
          functions.setClub(data[8]);
          functions.setPosition(data[5].slice(data[5].indexOf('-') + 2));
          functions.setFoot(data[6]);
          functions.setAgency(data[7]);
        } else {
          console.log(data);
          functions.setName(data[data.length - 1]);
          functions.setAge(data[3]);
          functions.setNationality(data[5]);
          functions.setClub(data[9]);
          functions.setPosition(data[6].slice(data[6].indexOf('-') + 2));
          functions.setFoot(data[7]);
          functions.setAgency(data[8]);
        }
      })
      .then(result => setLoading(false))
      .catch(error => {
        alert('Could not load player details');
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className={loading ? 'opacity-25' : ''}>
      <h1>Basic Details</h1>
      <h5>
        Paste Transfermarkt URL of player's profile to load details
        automatically
      </h5>
      <div className="input-group mb-3 center">
        <input
          onChange={onURLChange}
          type="text"
          className="w-60"
          placeholder="URL example: https://www.transfermarkt.com/lionel-messi/profil/spieler/28003"
        />
        <div className="input-group-append">
          <button
            onClick={onSubmitURL}
            className="btn btn-primary"
            type="button"
          >
            Load Player
          </button>
        </div>
      </div>
      <p>{console.log(values)}</p>
      <div className="row w-90 border border-dark center mt-5">
        <div className="col-sm mx-4 gap-5">
          <div className="text-start my-4 vstack">
            <label>Full Name</label>
            <input
              value={values.Name}
              onChange={onNameChange}
              type="text"
              className="rounded p-1"
              placeholder="Player's full name"
            ></input>
          </div>
          <div className="text-start my-4 vstack ">
            <label>Nationality</label>
            <input
              value={values.Nationality}
              onChange={onNationalityChange}
              type="text"
              className="rounded p-1"
              placeholder="Player's nationality"
            ></input>
          </div>
          <div className="d-flex flex-row gap-4 my-4">
            <div className="">
              <label className="d-flex align-items-start vstack ">
                Date of birth{' '}
              </label>
              <DatePicker className="rounded p-1" />
            </div>
            <div className="flex-column d-flex">
              <label className="d-flex align-items-start vstack ">Age</label>
              <input
                value={values.Age}
                onChange={onAgeChange}
                type="text"
                className="rounded p-1"
                placeholder="Player's age"
              ></input>
            </div>
          </div>
          <div className="text-start vstack my-4">
            <label>Club</label>
            <input
              value={values.Club}
              onChange={onClubChange}
              type="text"
              className="rounded p-1"
              placeholder="Player's club"
            ></input>
          </div>
        </div>
        <div className="col-sm mt-5 mx-4 gap-5">
          <div className="text-start my-4 vstack">
            <label>Position</label>
            <input
              value={values.Position}
              onChange={onPositionChange}
              type="text"
              className="rounded p-1"
              placeholder="Player's position"
            ></input>
          </div>
          <div className="text-start my-4 vstack">
            <label>Strong foot</label>
            <input
              value={values.Foot}
              onChange={onNameChange}
              type="text"
              className="rounded p-1"
              placeholder="Player's preffered foot"
            ></input>
          </div>
          <div className="text-start my-4 vstack">
            <label>Agency</label>
            <input
              value={values.Agency}
              onChange={onNameChange}
              type="text"
              className="rounded p-1"
              placeholder="Player's position"
            ></input>
          </div>
          <button onClick={Continue}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default BasicProfileDetails;
