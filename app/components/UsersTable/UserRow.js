/**
 * User
 *
 * Shows a single user.
 */

import React from 'react';
import { Link } from 'react-router';

const UserRow = ({ user }) => (
  <tr>
    <td>{user.id}</td>
    <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
    <td>{user.email}</td>
    <td>{user.address}</td>
    <td>{user.role}</td>
  </tr>
);

UserRow.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default UserRow;
