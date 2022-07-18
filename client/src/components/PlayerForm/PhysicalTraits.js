import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import { Slider } from '@mui/material/';
import { grey } from '@mui/material/colors';
import React, { Component } from 'react';

function PhysicalTraits(props) {
  const Onchange = props.Onchange;
  const values = props.values;

  const Previous = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const Next = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const slide = (slidername, statevalue) => {
    return (
      <Slider
        name={slidername}
        onChange={Onchange}
        size="large"
        aria-label="Temperature"
        defaultValue={statevalue}
        valueLabelDisplay="on"
        step={1}
        marks
        min={1}
        max={10}
        sx={{
          width: 400,
          color: grey[50],
        }}
      />
    );
  };

  return (
    <div>
      <h1 className="m-1">Attributes</h1>
      <div className="row">
        <div className="mt-5 input-group mx-3 col-sm gap-5">
          <div className="input-group gap-3">
            <label>Short Passing</label>
            {slide('ShortPassing', values.ShortPassing)}
          </div>
          <div className="input-group gap-3">
            <label>Long Passing</label>
            {slide('LongPassing', values.LongPassing)}
          </div>
          <div className="input-group gap-3">
            <label>Ball control</label>
            {slide('BallControl', values.BallControl)}
          </div>
          <div className="input-group gap-3">
            <label>Heading</label>
            {slide('Heading', values.Heading)}
          </div>
          <div className="input-group gap-3">
            <label>Weak foot</label>
            {slide('WeakFoot', values.WeakFoot)}
          </div>
        </div>
        <div className="mt-5 input-group mx-3 col-sm gap-5">
          <div className="input-group gap-3">
            <label>Pressing</label>
            {slide('Pressing', values.Pressing)}
          </div>
          <div className="input-group gap-3">
            <label>Long Shot</label>
            {slide('LongShot', values.LongShot)}
          </div>
          <div className="input-group gap-3">
            <label>Tackling</label>
            {slide('Tackling', values.Tackling)}
          </div>
          <div className="input-group gap-3">
            <label>Aggression</label>
            {slide('Aggression', values.Aggression)}
          </div>
          <div className="input-group gap-3">
            <label>Finishing</label>
            {slide('Finishing', values.Finishing)}
          </div>
        </div>
      </div>
      <button className="w-10 mt-5" onClick={Previous}>
        Previous
      </button>
      <button className="w-10 mt-5" onClick={Next}>
        Next
      </button>
    </div>
  );
}

export default PhysicalTraits;
