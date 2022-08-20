import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from './Sidebar';

const OthersPlayerRequests = () => {
  const [PlayerRequests, setPlayerRequests] = useState([]);
  const [activeRequest, setactiveRequest] = useState({});
  const [activeIndex, setactiveIndex] = useState(0);

  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post('/api/getplayerrequests', {
        userid: active_user,
      })
      .then(response => response.data)
      .then(requests => {
        console.log(requests);
        setPlayerRequests(requests);
        setactiveRequest(requests[activeIndex]);
      });
  }, []);

  // useEffect(() => {
  //   console.log(activeRequest);
  //   setactiveRequest(PlayerRequests[activeIndex]);
  //   console.log(activeRequest);
  // }, []);

  const RequestDetails = request => {
    navigate('/requestdetails', {
      state: { details: request },
    });
  };

  //filtering out traits into array
  const getTraits = request => {
    if (request) {
      const traits = Object.keys(request).reduce((arr, k) => {
        if (request[k] === true) {
          arr.push(k);
        }
        return arr;
      }, []);
      return traits;
    }
  };

  return (
    <div className="row">
      <Sidebar
        className="col"
        PlayerRequests={PlayerRequests}
        setactiveRequest={setactiveRequest}
        getTraits={getTraits}
      />
      <div className="col text-start ps-5">
        <h1>{activeRequest.Positions}</h1>
        <p>
          Plays consistant minutes with no recent injury records. Housing and
          car provided.
        </p>
        <p>
          <span className="fw-bold">Age: </span>
          {activeRequest.Ages}
        </p>
        <p>
          <span className="fw-bold">Foot: </span>
          {activeRequest.Foot}
        </p>
        <p className="fw-bold">Traits: </p>
        <p>{getTraits(activeRequest)}</p>
      </div>
      {/* {PlayerRequests.map((request, i) => {
        return (
          <div className="card w-40 mx-5 my-1" key={i}>
            <div className="card-body">
              <h5 className="card-subtitle mb-2 text-muted">
                {`${request.Foot} footed ${request.Positions.slice(2, -2)}`}
              </h5>
              <h6 className="card-title">{`Posted by ${
                request.name
              } on ${request.Created.slice(0, 10)}`}</h6>
              <p></p>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => RequestDetails(request)}
              >
                Details
              </button>
            </div>
          </div>
        );
      })}
      ; */}
    </div>
  );
};

export default OthersPlayerRequests;
