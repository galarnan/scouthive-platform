import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import image from '../Signin/footballimage.png';
import '../Register/Register.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

function Register(props) {
  let navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [userType, setuserType] = useState('Agent');
  let clubName = useRef('');

  const handleTypeChange = event => {
    setuserType(event.target.value);
  };

  const onClubChange = event => {
    clubName.current = ' ' + event.target.value;
  };

  const onNameChange = event => {
    setname(event.target.value);
  };

  const onEmailChange = event => {
    setemail(event.target.value);
  };

  const onPasswordChange = event => {
    setpassword(event.target.value);
  };

  const onSubmitRegister = () => {
    let type = '';
    if (clubName.current)
      type = clubName.current; // if exists, turn club name into user type
    else type = userType;
    axios
      .post('/register', {
        email: email,
        password: password,
        name: name,
        type: type,
      })
      .then(response => response.data)
      .then(user => {
        if (user.loggedUser.id) {
          console.log('signed in');
          props.authentication(true);
          window.localStorage.setItem(
            'USER_ID',
            JSON.stringify(user.loggedUser.id)
          );
          window.localStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(user.Token)
          );
          console.log(`user token from login ${user.Token}`);
          axios.defaults.headers.common['Authorization'] = user.Token;
          history.replaceState(null, '', 'home'); // user cannot go back to register on back button
          navigate('/home');
        }
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-start container">
      <div className="align-items-center col-md-6">
        <main className="mt-5 d-flex justify-content-center align-items-center">
          <div>
            <fieldset id="sign_up" className="text-start b--transparent">
              <h1 className="m-0 font-weight-bold fs-1">Sign Up</h1>
              <div className="lh-copy mt1">
                <p className="text-start f6 gray db">
                  Already have an account?&nbsp;&nbsp;
                  <Link to="/">LOG IN</Link>
                </p>
              </div>
              <div className="mt-1">
                <label className="gray db fw6 lh-copy fs-5" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="rounded pa2 input-reset ba bg-transparent hover-bg-black b--black-30 w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                />
              </div>
              <label className="mt-4 gray db fw6 lh-copy fs-5">Role</label>
              <div className="radio-toolbar">
                <input
                  type="radio"
                  id="Agent"
                  name="radio"
                  value="Agent"
                  checked={userType === 'Agent'}
                  onChange={handleTypeChange}
                />
                <label className="rounded-start" htmlFor="Agent">
                  Agent
                </label>
                <input
                  type="radio"
                  id="Club"
                  name="radio"
                  value="Club"
                  checked={userType === 'Club'}
                  onChange={handleTypeChange}
                />
                <label htmlFor="Club">Club</label>
                <input
                  type="radio"
                  id="Scout"
                  name="radio"
                  value="Scout"
                  checked={userType === 'Scout'}
                  onChange={handleTypeChange}
                />
                <label className="rounded-end" htmlFor="Scout">
                  Independent Scout
                </label>
              </div>
              {
                //display club name input if user chose club
                userType === 'Club' ? (
                  <div className="gray mv3">
                    <label
                      className="gray db fw6 lh-copy fs-5"
                      htmlFor="clubName"
                    >
                      Club Name
                    </label>
                    <input
                      className="rounded pa2 input-reset ba bg-transparent hover-bg-black b--black-30 w-100"
                      type="text"
                      name="clubName"
                      id="clubName"
                      onChange={onClubChange}
                    />
                  </div>
                ) : (
                  ''
                )
              }
              <div className="gray mv3">
                <label
                  className="gray db fw6 lh-copy fs-5"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  className="rounded pa2 input-reset ba bg-transparent hover-bg-black b--black-30 w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="gray mv3">
                <label className="db fw6 lh-copy fs-5" htmlFor="password">
                  Password
                </label>
                <input
                  className="rounded b pa2 input-reset ba bg-transparent hover-bg-black b--black-30 w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
              <div>
                <input
                  onClick={onSubmitRegister}
                  className="bg-primary text-white rounded b pv2 input-reset ba b--black-50 grow fs-6 w-100"
                  type="submit"
                  value="CREATE ACCOUNT"
                />
              </div>
            </fieldset>
          </div>
          <div className="vertical"></div>
        </main>
      </div>
      <img src={image} />
    </div>
  );
}

export default Register;
