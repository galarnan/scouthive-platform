import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signin.css';
import image from './footballimage.png';

function Signin(props) {
  const [signInEmail, setEmail] = useState('');
  const [signInPassword, setPassword] = useState('');
  const [authError, setauthError] = useState(false);

  let navigate = useNavigate();

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    console.log(signInEmail, signInPassword);
    axios
      .post('/signin', {
        email: signInEmail,
        password: signInPassword,
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
          history.replaceState(null, '', 'home'); // user cannot go back to signin on back button
          navigate('/home');
        }
      })
      .catch(err => {
        setauthError(true);
        console.log(err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-start container">
      <div className="align-items-center col-md-6">
        <main className="mt-5 d-flex justify-content-center align-items-center">
          <div>
            <fieldset id="sign_up" className="text-start b--transparent">
              <h1 className="m-0 font-weight-bold fs-1">Welcome back</h1>
              <p className="gray mt-1 fs-5"> Please enter your details</p>
              <div className="mt-1">
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
                  onClick={onSubmitSignIn}
                  className="bg-primary text-white rounded b pv2 input-reset ba b--black-50 grow fs-6 w-100"
                  type="submit"
                  value="SIGN IN"
                />
              </div>
              <div className="lh-copy mt1">
                <p className="text-end f6 gray db ">
                  Don&apos;t have an account?&nbsp;&nbsp;
                  <Link to="/register">SIGN UP</Link>
                </p>
              </div>
            </fieldset>

            {authError ? (
              <p className="text red"> Incorrect email or password </p>
            ) : (
              ''
            )}
          </div>
          <div className="vertical"></div>
        </main>
      </div>
      <img src={image} />
    </div>
  );
}

export default Signin;
