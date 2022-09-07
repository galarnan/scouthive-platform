import React from 'react';
import RoleOrAttribute from '../../../components/RolesOrAttribute';
import SuggestedPlayers from './SuggestedPlayers';

const RequestSummary = ({ activeRequest, getTraits }) => {
  const traits = getTraits(activeRequest);
  const roles = traits.filter(trait => RoleOrAttribute(trait) == 'role');
  const attributes = traits.filter(
    trait => RoleOrAttribute(trait) == 'attribute'
  );
  const firstage = activeRequest.Ages.slice(2, 4);
  const secondage = activeRequest.Ages.slice(7, 9);
  const agerange = `${firstage}-${secondage}`;

  //provide fallback if offereids is null
  const offeredids = activeRequest.offeredids || '';

  return (
    <div
      className="col-9 text-start px-3 pb-3 overflow-hidden"
      style={{ maxHeight: '100%' }}
    >
      <h1 className="my-2">{activeRequest.Positions.slice(2, -2)}</h1>
      <p>
        Plays consistant minutes with no recent injury records. Housing and car
        provided.
      </p>
      <p className="mb-0 f6">
        <span className="fw-bold">Age: &nbsp;&nbsp;</span>
        {agerange}
      </p>
      <p className="mb-0 f6">
        <span className="fw-bold f6">Foot: &nbsp;</span>
        {activeRequest.Foot}
      </p>
      <p className="f6 mb-1">
        <span className="fw-bold f6">Roles: </span>
        {/*filtering out Roles from request*/}
        {String(roles)}
      </p>
      <p className="fw-bold f6 mb-0">Attributes: </p>
      {attributes.map((attribute, i) => {
        return (
          <span
            className="border px-3 py-1 me-2 rounded-pill bg-primary white f6"
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
        requestID={activeRequest.requestID}
        offeredids={offeredids.split(',')}
      />
    </div>
  );
};

export default RequestSummary;
