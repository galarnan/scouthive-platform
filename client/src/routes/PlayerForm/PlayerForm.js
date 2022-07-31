import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import BasicProfileDetails from './BasicProfileDetails';
import PhysicalTraits from './PhysicalTraits';
import PlayingStyles from './PlayingStyles';
import Players from '../Home/Players';

function PlayerForm() {
  const [traits, setTrait] = useState({
    LongPassing: 5,
    ShortPassing: 5,
    BallControl: 5,
    Heading: 5,
    Dribbling: 5,
    Pressing: 5,
    LongShot: 5,
    Tackling: 5,
    Aggression: 5,
    Finishing: 5,
    BoxtoBox: false,
    JoinsAttack: false,
    DeepLying: false,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setTrait({
      ...traits,
      [evt.target.name]: value,
    });
  }

  function handleCheck(evt) {
    const value = evt.target.checked;
    setTrait({
      ...traits,
      [evt.target.name]: value,
    });
  }

  //these states are seperated because they invlove more than just onChange functions
  const [Step, setStep] = useState(1);
  const [Name, setName] = useState('');
  const [Nationality, setNationality] = useState('');
  const [Birthdate, setBirthdate] = useState('');
  const [Age, setAge] = useState('');
  const [Club, setClub] = useState('');
  const [Foot, setFoot] = useState('');
  const [Agency, setAgency] = useState('');
  const [Position, setPosition] = useState('');

  const values = {
    ...traits,
    Name,
    Nationality,
    Birthdate,
    Age,
    Club,
    Foot,
    Agency,
    Position,
  };

  const nextStep = () => {
    setStep(Step + 1);
  };

  const prevStep = () => {
    setStep(Step - 1);
  };

  const functions = {
    nextStep,
    setName,
    setNationality,
    setBirthdate,
    setAge,
    setClub,
    setPosition,
    setAgency,
    setFoot,
  };

  switch (Step) {
    case 1:
      return <BasicProfileDetails functions={functions} values={values} />;
    case 2:
      return (
        <PhysicalTraits
          Onchange={handleChange}
          values={values}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 3:
      return (
        <PlayingStyles
          Onchange={handleCheck}
          values={values}
          prevStep={prevStep}
          Submit={nextStep}
        />
      );
    case 4:
      return <Players />;
    // never forget the default case, otherwise VS code would be mad!
    default:
    // do nothing
  }
}

export default PlayerForm;
