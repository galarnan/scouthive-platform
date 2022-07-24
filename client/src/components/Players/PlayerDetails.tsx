import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PlayerDetails(): JSX.Element {
  useEffect(() => {
    window.localStorage.setItem('IS_LOGGED_IN', JSON.stringify(true));
  });

  interface LocationProps {
    details: [];
  }

  interface detailtype {
    Foot: string;
    Agency: string;
    Name: string;
  }

  const location = useLocation().state as LocationProps;
  const details = location.details;

  return (
    <div className="row">
      <h1>got into player profile!</h1>
      {details.map((detail, key) => {
        const { Foot, Agency, Name }: detailtype = detail;
        return (
          <div key={key}>
            <p>{Foot}</p>
            <p>{Agency}</p>
            <p>{Name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PlayerDetails;
