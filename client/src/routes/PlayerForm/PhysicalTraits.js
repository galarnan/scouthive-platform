import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import { Slider } from '@mui/material/';
import { grey } from '@mui/material/colors';
import React, { Component } from 'react';

function PhysicalTraits(props) {
  const Onchange = props.Onchange;
  const values = props.values;

  const Previous = e => {
    e.preventDefault();
    props.prevStep();
  };

  const Next = e => {
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
            {slide('Short Passing', values['Short Passing'])}
          </div>
          <div className="input-group gap-3">
            <label>Long Passing</label>
            {slide('Long Passing', values['Long Passing'])}
          </div>
          <div className="input-group gap-3">
            <label>Ball control</label>
            {slide('Ball Control', values['Ball Control'])}
          </div>
          <div className="input-group gap-3">
            <label>Heading</label>
            {slide('Heading', values['Heading'])}
          </div>
          <div className="input-group gap-3">
            <label>Dribbling</label>
            {slide('Dribbling', values['Dribbling'])}
          </div>
          <div className="input-group gap-3">
            <label>Composure</label>
            {slide('Composure', values['Composure'])}
          </div>
          <div className="input-group gap-3">
            <label>Leadership</label>
            {slide('Leadership', values['Leadership'])}
          </div>
          <div className="input-group gap-3">
            <label>First Touch</label>
            {slide('First Touch', values['First Touch'])}
          </div>
          <div className="input-group gap-3">
            <label>Pace</label>
            {slide('Pace', values['Pace'])}
          </div>
          <div className="input-group gap-3">
            <label>Stamina</label>
            {slide('Stamina', values['Stamina'])}
          </div>
        </div>
        <div className="mt-5 input-group mx-3 col-sm gap-5">
          <div className="input-group gap-3">
            <label>Pressing</label>
            {slide('Pressing', values['Pressing'])}
          </div>
          <div className="input-group gap-3">
            <label>Long Shot</label>
            {slide('Long Shot', values['Long Shot'])}
          </div>
          <div className="input-group gap-3">
            <label>Tackling</label>
            {slide('Tackling', values['Tackling'])}
          </div>
          <div className="input-group gap-3">
            <label>Aggression</label>
            {slide('Aggression', values['Aggression'])}
          </div>
          <div className="input-group gap-3">
            <label>Finishing</label>
            {slide('Finishing', values['Finishing'])}
          </div>
          <div className="input-group gap-3">
            <label>Strength</label>
            {slide('Strength', values['Strength'])}
          </div>
          <div className="input-group gap-3">
            <label>Decision Making</label>
            {slide('Decision Making', values['Decision Making'])}
          </div>
          <div className="input-group gap-3">
            <label>Work Rate</label>
            {slide('Work Rate', values['Work Rate'])}
          </div>
          <div className="input-group gap-3">
            <label>Vision</label>
            {slide('Vision', values.Vision)}
          </div>
          <div className="input-group gap-3">
            <label>Freekick Taking</label>
            {slide('Freekick Taking', values['Freekick Taking'])}
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
