import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
          navigate('/home');
        }
      })
      .catch(err => {
        setauthError(true);
        console.log(err);
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black b--black-30 hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black b--black-30 hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <p className="text red">
            {authError ? 'Incorrect email or password' : ''}
          </p>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="br3 b ph3 pv2 input-reset ba b--black-50 bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => navigate('/register')}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;
