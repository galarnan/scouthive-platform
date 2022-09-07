import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/OthersPlayerRequests.css';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import RequestSummary from './components/RequestSummary';
import RoleOrAttribute from '../../components/RolesOrAttribute';
import FilterBar from './components/FilterBar';

const OthersPlayerRequests = () => {
  const [PlayerRequests, setPlayerRequests] = useState([]);
  const [activeRequest, setactiveRequest] = useState(undefined);

  //function that filters out traits from request into array
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

  const active_user = parseInt(window.localStorage.getItem('USER_ID'), 10);
  let navigate = useNavigate();

  useEffect(() => {
    //fetching connections' player requests from db
    axios
      .post('/api/getplayerrequests', {
        userid: active_user,
      })
      .then(response => response.data)
      .then(requests => {
        setPlayerRequests(requests);
        setactiveRequest(requests[0]);
      });
  }, []);

  useEffect(() => {
    //pushing attributes, age range and roles into active request
    if (activeRequest) {
      const traits = getTraits(activeRequest);
      const Roles = traits.filter(trait => RoleOrAttribute(trait) == 'role');
      const Attributes = traits.filter(
        trait => RoleOrAttribute(trait) == 'attribute'
      );
      const FirstAge = activeRequest.Ages.slice(2, 4);
      const SecondAge = activeRequest.Ages.slice(7, 9);
      setactiveRequest({
        ...activeRequest,
        Attributes,
        FirstAge,
        SecondAge,
        Roles,
      });
    }
  }, []);

  const RequestDetails = request => {
    navigate('/requestdetails', {
      state: { details: request },
    });
  };

  return (
    <>
      <div className="margincolor fillpage90 d-flex row align-items-center center py-4">
        {/* <FilterBar /> */}
        <div className="row fillpage100 bg-white w-80 px-0 generalBorder">
          <Sidebar
            className="col"
            PlayerRequests={PlayerRequests}
            setactiveRequest={setactiveRequest}
            getTraits={getTraits}
          />
          {activeRequest ? (
            <RequestSummary
              activeRequest={activeRequest}
              getTraits={getTraits}
            />
          ) : (
            <></>
          )}
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
      </div>
    </>
  );
};

export default OthersPlayerRequests;
