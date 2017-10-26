import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { shallow } from 'enzyme';
import configureStore from 'store';

import UsersTable from 'components/UsersTable';
import { UsersPage, mapStateToProps, mapDispatchToProps } from '../index';


describe('<UsersPage />', () => {
  let loadUsersSpy;
  let deleteUserSpy;

  beforeEach(() => {
    loadUsersSpy = jest.fn();
    deleteUserSpy = jest.fn();
  });

  it('should render with a Helmet', () => {
    const renderedComponent = shallow(
      <UsersPage loadUsers={loadUsersSpy} deleteUser={deleteUserSpy} />
    );

    expect(renderedComponent.find(Helmet)).toHaveLength(1);
    expect(renderedComponent.find(Helmet).prop('title')).toBeTruthy();
    expect(renderedComponent.find(Helmet).prop('meta')).toBeTruthy();
    expect(loadUsersSpy).not.toHaveBeenCalled();
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should render with a UsersTable and pass correct props', () => {
    const usersTableProps = {
      loading: false,
      error: false,
      users: [{ name: 'tester' }],
      deleteUser: deleteUserSpy,
    };
    const renderedComponent = shallow(
      <UsersPage {...usersTableProps} loadUsers={loadUsersSpy} deleteUser={deleteUserSpy} />
    );

    expect(renderedComponent.contains(
      <UsersTable {...usersTableProps} />
    )).toBe(true);
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should load users by default', () => {
    shallow(
      <UsersPage
        users={false}
        loadUsers={loadUsersSpy}
        deleteUser={deleteUserSpy}
      />
    );

    expect(loadUsersSpy).toHaveBeenCalled();
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should NOT initially load users if loading', () => {
    shallow(
      <UsersPage
        loading
        users={false}
        loadUsers={loadUsersSpy}
        deleteUser={deleteUserSpy}
      />
    );

    expect(loadUsersSpy).not.toHaveBeenCalled();
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should NOT initially load users if error', () => {
    shallow(
      <UsersPage
        error
        users={false}
        loadUsers={loadUsersSpy}
        deleteUser={deleteUserSpy}
      />
    );

    expect(loadUsersSpy).not.toHaveBeenCalled();
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  describe('maps state/dispatch to props', () => {
    const initialState = {
      usersPage: {
        users: false,
        deleteUser: deleteUserSpy,
      },
    };
    const store = configureStore(initialState, browserHistory);
    const state = store.getState();

    let props;
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.fn();

      props = {
        ...mapStateToProps(state),
        ...mapDispatchToProps(dispatchSpy),
      };
    });

    ['deleteUser', 'loadUsers', 'users', 'error', 'loading'].forEach((propName) => {
      it(`${propName} prop should be defined`, () => {
        expect(props[propName]).toBeDefined();
      });
    });

    describe('loadUsers()', () => {
      let loadUsers;

      beforeEach(() => {
        loadUsers = props.loadUsers;
      });

      it('should dispatch action', () => {
        loadUsers();
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });

    describe('deleteUser()', () => {
      let deleteUser;

      beforeEach(() => {
        deleteUser = props.deleteUser;
      });

      it('should dispatch action', () => {
        deleteUser();
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });
});
