import FriendRequests from './FriendRequests';
import UsersList from './UsersList';
import React, { useState, useEffect } from 'react';

const Connections = () => (
  <div>
    <h1 className="text-start mx-5">Requests</h1>
    <FriendRequests />
    <h1 className="text-start mx-5">Suggestions</h1>
    <UsersList />
  </div>
);

export default Connections;
