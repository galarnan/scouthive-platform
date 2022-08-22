import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlayers } from '../../Home/playersSlice';
import ReactCountryFlag from 'react-country-flag';
import countries from '../../Home/countries';
import '../css/OthersPlayerRequests.css';
import 'tachyons';

const SuggestedPlayers = props => {
  const players = useSelector(selectAllPlayers);
  let reducedPlayerArray = [];

  //function that filters out roles from traits
  const getRoles = Player => {
    if (Player) {
      const Roles = Object.keys(Player).reduce((arr, k) => {
        if (Player[k] === true) {
          arr.push(k);
        }
        return arr;
      }, []);
      return Roles;
    }
  };

  const convertPositionText = position => {
    //change position text to abbreviation (eg. Central Midfield => CM)
    const hasDash = position.includes('-'); // char before second capital is either '-' or ' '
    if (hasDash) {
      position = position[0] + position[position.indexOf('-') + 1];
    } else {
      position = position[0] + position[position.indexOf(' ') + 1];
    }
    return position;
  };

  //continue only if player is in relevant position,
  players.forEach(player => {
    if (
      !props.position.includes(player.Position[0]) || //Player.Position[0/1] refer to abbreviation
      !props.position.includes(player.Position[1])
    )
      return;
    //reducing player obj to relevant fields + new fields such as interestCounter and MatchingQualities(which will include all matching traits/roles)
    //second element in array is used for text color in classname (depending on if trait is a match compared to request demands)
    let reducedPlayerObj = {
      Name: player['Name'],
      Age: [player['Age'], ''],
      Position: [player['Position'], ''],
      Club: player['Club'],
      Foot: [player['Foot'], ''],
      Attributes: [],
      Roles: [],
      interestCounter: 0,
      playerID: player['playerID'],
    };
    if (player.Age >= props.firstage && player.Age <= props.secondage) {
      reducedPlayerObj['interestCounter']++;
      reducedPlayerObj['Age'] = [player['Age'], 'green'];
    }
    if (props.foot.includes(player.Foot)) {
      reducedPlayerObj['interestCounter']++;
      reducedPlayerObj['Foot'] = [player['Foot'], 'green'];
    }
    if (props.position.includes(player.Position)) {
      reducedPlayerObj['interestCounter']++;
      reducedPlayerObj['Position'] = [player['Position'], 'green'];
    }
    props.attributes.forEach(attribute => {
      if (player[attribute] >= 7) {
        reducedPlayerObj['interestCounter']++;
        reducedPlayerObj['Attributes'].push(
          // eslint-disable-next-line prettier/prettier
          [`${attribute}: ${player[attribute]}`, 'green']
        );
      } else {
        reducedPlayerObj['Attributes'].push(
          // eslint-disable-next-line prettier/prettier
          [`${attribute}: ${player[attribute]}`, '']
        );
      }
    });
    let playeroles = getRoles(player);
    props.roles.forEach(Role => {
      console.log({ player, Role });
      if (player[Role] === true) {
        reducedPlayerObj['interestCounter']++;
        reducedPlayerObj['Roles'].push(
          // eslint-disable-next-line prettier/prettier
            [`${Role}`, 'green']
        );
      } else {
        reducedPlayerObj['Roles'].push(
          // eslint-disable-next-line prettier/prettier
            [`${playeroles}`, '']
        );
      }
    });
    reducedPlayerArray.push(reducedPlayerObj);
    console.log(reducedPlayerArray);
  });

  reducedPlayerArray.sort((a, b) => {
    return b.interestCounter - a.interestCounter;
  });

  const calculateMatchPercentage = interestCounter => {
    return `${Math.round(
      (interestCounter / (props.attributes.length + 3)) * 100
    )}%`;
  };

  return (
    <table className="my-4 align-middle">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Pos.</th>
          <th>Foot</th>
          <th>Attributes</th>
          <th>Role</th>
          <th>Match %</th>
          <th></th>
          <th></th>
        </tr>
        {reducedPlayerArray.map((player, key) => {
          return (
            <tr key={key}>
              <td>{player.Name}</td>
              <td className={`text ${player.Age[1]}`}>{player.Age[0]}</td>
              <td className={`text ${player.Position[1]}`}>
                {convertPositionText(player.Position[0])}
              </td>
              <td className={`text ${player.Foot[1]}`}>
                {player.Foot[0][0].toUpperCase()}
              </td>
              <td>
                {player.Attributes.map((attribute, k) => {
                  return (
                    <p
                      key={k}
                      className={`m-0 text-start lh-copy text ${attribute[1]}`}
                    >
                      {attribute[0]}
                    </p>
                  );
                })}
              </td>
              <td>
                {player.Roles.map((role, j) => {
                  return (
                    <span key={j} className={`${role[1]}`}>
                      {role[0]}
                    </span>
                  );
                })}
              </td>
              <td>{calculateMatchPercentage(player.interestCounter)}</td>
              <td className="w-10">
                <button
                  type="button"
                  onClick={() => console.log('clicked')}
                  className="btn btn-primary btn-sm"
                >
                  Details
                </button>
              </td>
              <td className="w-10">
                <button
                  type="button"
                  onClick={() => console.log('clicked')}
                  className="btn btn-primary btn-sm"
                >
                  Send
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SuggestedPlayers;
