import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Table } from 'reactstrap';

import LoadingIndicator from 'components/LoadingIndicator';
import UserRow from './UserRow';
import messages from './messages';

const UsersTable = ({ loading, error = false, users }) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    return <h3><FormattedMessage {...messages.error} /></h3>;
  }

  if (users !== false) {
    const rows = users.map((user, index) => <UserRow key={`user-${index}`} user={user} />);

    return (
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th><FormattedMessage {...messages.username} /></th>
            <th>E-mail</th>
            <th><FormattedMessage {...messages.address} /></th>
            <th><FormattedMessage {...messages.role} /></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }

  return null;
};

UsersTable.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  users: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

export default UsersTable;
