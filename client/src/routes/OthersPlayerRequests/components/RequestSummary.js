import React from 'react';
import RoleOrAttribute from '../../components/RolesOrAttribute';
import SuggestedPlayers from './components/SuggestedPlayers';

const RequestSummary = ({ activeRequest, getTraits }) => {
  const traits = getTraits(activeRequest);
  const roles = traits.filter(trait => RoleOrAttribute(trait) == 'role');
  const attributes = traits.filter(
    trait => RoleOrAttribute(trait) == 'attribute'
  );
  const firstage = activeRequest.Ages.slice(2, 4);
  const secondage = activeRequest.Ages.slice(7, 9);
  const agerange = `${firstage}-${secondage}`;
  return (
    <div className="col text-start ps-4">
      <h1>{activeRequest.Positions.slice(2, -2)}</h1>
      <p>
        Plays consistant minutes with no recent injury records. Housing and car
        provided.
      </p>
      <p className="mb-0">
        <span className="fw-bold">Age: &nbsp;&nbsp;</span>
        {agerange}
      </p>
      <p className="mb-0">
        <span className="fw-bold">Foot: &nbsp;</span>
        {activeRequest.Foot}
      </p>
      <p>
        <span className="fw-bold">Roles: </span>
        {/*filtering out Roles from request*/}
        {String(roles)}
      </p>
      <p className="fw-bold">Attributes: </p>
      {attributes.map((attribute, i) => {
        return (
          <span
            className="border px-3 py-1 me-2 rounded-pill bg-primary white"
            key={i}
          >
            {attribute}
          </span>
        );
      })}
      <SuggestedPlayers
        firstage={firstage}
        secondage={secondage}
        position={activeRequest.Positions}
        foot={activeRequest.Foot}
        attributes={attributes}
        roles={roles}
        nationality={activeRequest.nationality}
      />
    </div>
  );
};

export default RequestSummary;
