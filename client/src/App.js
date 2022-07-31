import React, { useState, useEffect, useRef } from 'react';
import {
  Routes,
  BrowserRouter,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Signin from './routes/Signin/Signin';
import Register from './routes/Register/Register';
import Players from './routes/Home/Players';
import PlayerDetails from './routes/Home/PlayerDetails';
import PlayerForm from './routes/PlayerForm/PlayerForm';
import Connections from './routes/Connections/Connections';
import CreateRequest from './routes/PlayerRequestForm/PlayerRequestForm';
import PlayerRequests from './routes/OthersPlayerRequests/OthersPlayerRequests';
import PlayerRequestDetails from './routes/PlayerRequestPage/ViewRequestDetails';
import MyPlayerRequests from './routes/MyPlayerRequests/MyPlayerRequests';

import PrivateOutlet from './components/PrivateRoute/PrivateOutlet';

function App() {
  const [isSignedIn, setisSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    joined: '',
  });

  const clearState = () => {
    setisSignedIn(false);
    setUser({});
    window.localStorage.removeItem('USER_ID');
    window.localStorage.removeItem('ACCESS_TOKEN');
  };

  const authentication = state => {
    if (state) {
      setisSignedIn(true);
      console.log(`Authenticated changed state to ${isSignedIn}`);
    } else {
      setisSignedIn(false);
      clearState();
    }
  };

  const ProtectedRoute = () => {
    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };

  useEffect(() => {
    if (window.localStorage.getItem('ACCESS_TOKEN')) setisSignedIn(true);
  }, [isSignedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation authentication={authentication} isSignedIn={isSignedIn} />
        <Routes>
          <Route
            path="/"
            element={<Signin authentication={authentication} />}
          />
          <Route
            path="/register"
            element={<Register authentication={authentication} />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Players userid={user.id} />} />
            <Route path="/playerdetails" element={<PlayerDetails />} />
            <Route path="/addplayer" element={<PlayerForm />} />
            <Route path="/createrequest" element={<CreateRequest />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/playerrequests" element={<PlayerRequests />} />
            <Route path="/myplayerrequests" element={<MyPlayerRequests />} />
            <Route path="/requestdetails" element={<PlayerRequestDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
