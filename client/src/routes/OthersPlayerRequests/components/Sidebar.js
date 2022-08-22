import React, { useState } from 'react';
import RoleOrAttribute from '../../../components/RolesOrAttribute';
import '../css/SideBar.css';

// const getRoles = traits => {
//   const Roles = traits.filter(trait => {
//     if ()
//   });
// }

const Sidebar = ({ PlayerRequests, setactiveRequest, getTraits }) => {
  const [activeIndex, setactiveIndex] = useState(0);

  let traits = '';
  const requests = PlayerRequests.map(
    (request, i) => (
      traits = getTraits(request),
      (
        <a
          href="#"
          className={`list-group-item list-group-item-action lh-tight my-0 ${activeIndex === i ? 'focus' : ''}`}
          key={i}
          onClick = {()=> {
            setactiveIndex(i);
            setactiveRequest(request);
          }}
        >
          <div className="text-start d-flex w-100 f4 align-items-center justify-content-between ms-3">
            <strong className="mb-1">{request.Positions.slice(2, -2)}</strong>
          </div>
          {/*filtering out Roles from request*/}
          <p className="text-start mb-1 ms-3">
            {String(traits.filter(trait => RoleOrAttribute(trait) == 'role'))}
          </p>
          <p className="f6 text-start mb-0 gray ms-3">
            Created by {request.name}
          </p>
          <p className="f6 text-start mb-0 gray ms-3">
            {request.Created.slice(0, 10)}
          </p>
        </a>
      )
    )
  );

  return (
    <div className="d-flex pt-1 px-0 flex-column align-items-stretch flex-shrink-0 w-20 sidebar-wrapper">
      <div className="list-group list-group-flush border-bottom scrollarea">
        {requests}
      </div>
    </div>
  );
};

export default Sidebar;
