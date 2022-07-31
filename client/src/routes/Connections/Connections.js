import FriendRequests from './FriendRequests';
import UsersList from './UsersList';
import MyFriends from './MyFriends';
import React, { useState, useEffect } from 'react';

const Connections = () => (
  <div>
    <h1 className="text-start mx-5">Requests</h1>
    <FriendRequests />
    <h1 className="text-start mx-5">Suggestions</h1>
    <UsersList />
    <h1 className="text-start mx-5">My Connections</h1>
    <MyFriends />
  </div>
);

export default Connections;
