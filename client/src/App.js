import React, { useState, useEffect } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Signin from './routes/Signin/Signin';
import Register from './routes/Register/Register';
import Players from './components/Players/Players';
import PlayerDetails from './components/Players/PlayerDetails';
import PlayerForm from './components/PlayerForm/PlayerForm';
import Connections from './routes/Connections/Connections';
import CreateRequest from './routes/PlayerRequestForm/PlayerRequestForm';
import PlayerRequests from './routes/OthersPlayerRequests/OthersPlayerRequests';
import PlayerRequestDetails from './routes/PlayerRequestPage/ViewRequestDetails';
import MyPlayerRequests from './routes/MyPlayerRequests/MyPlayerRequests';

function App() {
  const [isSignedIn, setSignedin] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    joined: '',
  });

  useEffect(() => {
    const data = window.localStorage.getItem('IS_LOGGED_IN');
    if (data !== null) setSignedin(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('IS_LOGGED_IN', JSON.stringify(isSignedIn));
  }, [isSignedIn]);

  const clearState = () => {
    setSignedin(false);
    setUser({});
    window.localStorage.setItem('IS_LOGGED_IN', JSON.stringify(false));
    window.localStorage.removeItem('USER_ID');
  };

  const authentication = state => {
    if (state) {
      setSignedin(true);
    } else {
      setSignedin(false);
      clearState();
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation authentication={authentication} isSignedIn={isSignedIn} />
        <Routes>
          <Route
            path="/"
            element={<Signin authentication={authentication} />}
          />
          <Route path="/home" element={<Players userid={user.id} />} />
          <Route path="/playerdetails" element={<PlayerDetails />} />
          <Route
            path="/register"
            element={<Register authentication={authentication} />}
          />
          <Route path="/addplayer" element={<PlayerForm />} />
          <Route path="/createrequest" element={<CreateRequest />} />
          <Route path="/users" element={<Connections />} />
          <Route path="/playerrequests" element={<PlayerRequests />} />
          <Route path="/myplayerrequests" element={<MyPlayerRequests />} />
          <Route path="/requestdetails" element={<PlayerRequestDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
