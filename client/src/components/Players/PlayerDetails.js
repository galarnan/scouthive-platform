import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function PlayerDetails (props) {

useEffect (()=> {
  window.localStorage.setItem('IS_LOGGED_IN', JSON.stringify(true))
})

const location = useLocation();
const details = location.state.details;

return(
  <div>
  <h1>got into player profile!</h1>
  {details.map((detail,key) => {
    const {Foot, Agency, Name} = detail;
      return(
      <div key={key}>
      <p >{Foot}</p>
      <p>{Agency}</p>
      <p>{Name}</p>
      </div>
      )
  })}
</div>

);


}

export default PlayerDetails;