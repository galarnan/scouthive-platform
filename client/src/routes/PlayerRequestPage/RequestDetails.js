import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { readConfigFile } from 'typescript';
import SuggestedPlayers from './SuggestedPlayers';

const RequestDetails = () => {
  const location = useLocation();
  const details = location.state.details;

  const firstage = details['Ages'].slice(2, 4);
  const secondage = details['Ages'].slice(7, 9);
  const agerange = `${firstage}-${secondage}`;
  const foot = details['Foot'];
  const position = details['Positions'].slice(2, -2);
  const datecreated = details['Created'].slice(0, 10);

  const entries = Object.entries(details);
  const values = Object.values(details);

  //filtering out traits into array
  const traits = Object.keys(details).reduce((arr, k) => {
    if (details[k] === true) {
      arr.push(k);
    }
    return arr;
  }, []);

  return (
    <div>
      <h3> Request </h3>
      <div className="justify-content-md-center d-flex">
        <div className="row w-70 mb-auto border">
          <div className="d-flex justify-content-md-center d-flex gap-5 p-3">
            <p className="my-auto">Strong foot: {foot}</p>
            <p className="my-auto">Positions: {position}</p>
            <p className="my-auto">Ages: {agerange}</p>
            <p className="my-auto">Date created: {datecreated}</p>
          </div>
          <div className="d-flex justify-content-md-center d-flex gap-5 p-3">
            <p className="my-auto">Traits: {traits}</p>
            <p className="my-auto">Created by: {details['name']}</p>
          </div>
        </div>
      </div>
      <h3 className="mt-5"> Suggested Players </h3>
      <SuggestedPlayers
        firstage={firstage}
        secondage={secondage}
        position={position}
        foot={foot}
        traits={traits}
      />
    </div>
  );
};

export default RequestDetails;
