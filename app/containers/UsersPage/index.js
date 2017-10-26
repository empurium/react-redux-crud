import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import UsersTable from 'components/UsersTable';
import { loadUsers as actionLoadUsers, deleteUser as actionDeleteUser } from './actions';
import { makeSelectUsers } from './selectors';

export class UsersPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { loading, error, loadUsers, users } = this.props;
    if (!loading && !error && users === false) {
      loadUsers();
    }
  }

  render() {
    const { loading, error, users, loadUsers, deleteUser } = this.props;
    const usersTableProps = { loading, error, users, deleteUser };

    return (
      <div>
        <Helmet
          title="Users"
          meta={[
            { name: 'description', content: 'Users List' },
          ]}
        />

        <div className="d-flex flex-row-reverse mb-3">
          <Button color="secondary" onClick={loadUsers}>
            <i className="fa fa-refresh"></i>
          </Button>
        </div>

        <UsersTable {...usersTableProps} />
      </div>
    );
  }
}

UsersPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  users: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loadUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};


export function mapStateToProps(state) {
  return {
    loading: makeSelectLoading()(state),
    error: makeSelectError()(state),
    users: makeSelectUsers()(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(actionLoadUsers()),
    deleteUser: (user) => dispatch(actionDeleteUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
