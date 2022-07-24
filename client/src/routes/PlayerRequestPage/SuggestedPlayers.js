import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlayers } from '../../components/Players/playersSlice';
import 'tachyons';

const SuggestedPlayers = props => {
  console.log(props.traits);
  const players = useSelector(selectAllPlayers);

  let reducedPlayerArray = [];

  players.forEach(player => {
    console.log(player);
    //reducing player obj to relevant fields + new fields such as interestCounter and MatchingQualities(which will include all matching traits/roles)
    //second element in array is used for text color in classname (depending on if attribute is a match compared to request demands)
    let reducedPlayerObj = {
      Name: player['Name'],
      Age: [player['Age'], ''],
      Position: [player['Position'], ''],
      Club: player['Club'],
      Foot: [player['Foot'], ''],
      MatchingQualities: [],
      interestCounter: 0,
      playerID: player['playerID'],
    };
    if (player.Age >= props.firstage && player.Age <= props.secondage) {
      reducedPlayerObj['interestCounter']++;
      reducedPlayerObj['Age'] = [player['Age'], 'green'];
    }
    if (props.feet.includes(player.Foot)) {
      reducedPlayerObj['interestCounter']++;
      reducedPlayerObj['Foot'] = [player['Foot'], 'green'];
    }
    if (props.position.includes(player.Position)) {
      reducedPlayerObj['interestCounter']++;
      reducedPlayerObj['Position'] = [player['Position'], 'green'];
    }
    props.traits.forEach(trait => {
      if (player[trait] >= 7) {
        reducedPlayerObj['interestCounter']++;
        reducedPlayerObj['MatchingQualities'].push(
          // eslint-disable-next-line prettier/prettier
          [`${trait}: ${player[trait]}`, 'green']
        );
      } else {
        reducedPlayerObj['MatchingQualities'].push(
          // eslint-disable-next-line prettier/prettier
          [`${trait}: ${player[trait]}`, '']
        );
      }
    });
    reducedPlayerArray.push(reducedPlayerObj);
  });

  reducedPlayerArray.sort((a, b) => {
    return b.interestCounter - a.interestCounter;
  });

  const calculateMatchPercentage = interestCounter => {
    return `${Math.round(
      (interestCounter / (props.traits.length + 3)) * 100
    )}%`;
  };

  return (
    <div className="justify-content-center mx-5">
      <table className="table table-light table-bordered align-middle">
        <tbody>
          <tr className="table-dark">
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Foot</th>
            <th>Matching Qualities</th>
            <th>Match %</th>
          </tr>
          {reducedPlayerArray.map((player, key) => {
            return (
              <tr key={key}>
                <td>
                  <button
                    type="button"
                    // onClick={fetch_playerdetails.bind(this, player.playerID)}
                    className="btn btn-link"
                  >
                    {player.Name}
                  </button>
                </td>
                <td className={`text ${player.Age[1]}`}>{player.Age[0]}</td>
                <td className={`text ${player.Position[1]}`}>
                  {player.Position[0]}
                </td>
                <td className={`text ${player.Foot[1]}`}>{player.Foot[0]}</td>
                <td>
                  {player.MatchingQualities.map((trait, k) => {
                    return (
                      <p
                        key={k}
                        className={`m-0 text-start f6 lh-copy text ${trait[1]}`}
                      >
                        {trait[0]}
                      </p>
                    );
                  })}
                </td>
                <td>{calculateMatchPercentage(player.interestCounter)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuggestedPlayers;
