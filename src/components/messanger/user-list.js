import React from 'react';

const UserList = props => {
  const { users } = props;

  return (
    users.map(user => {
      return (
        <li key={user}>{user}</li>
      );
    })
  );
}


export default UserList;