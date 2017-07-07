import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { shallow } from 'enzyme';
import configureStore from 'store';

import UsersTable from 'components/UsersTable';
import { UsersPage, mapStateToProps, mapDispatchToProps } from '../index';


describe('<UsersPage />', () => {
  let loadUsersSpy;

  beforeEach(() => {
    loadUsersSpy = jest.fn();
  });

  it('should render with a Helmet', () => {
    const renderedComponent = shallow(
      <UsersPage loadUsers={loadUsersSpy} />
    );

    expect(renderedComponent.find(Helmet)).toHaveLength(1);
    expect(renderedComponent.find(Helmet).prop('title')).toBeTruthy();
    expect(renderedComponent.find(Helmet).prop('meta')).toBeTruthy();
  });

  it('should render with a UsersTable and pass correct props', () => {
    const usersTableProps = {
      loading: false,
      error: false,
      users: false,
    };
    const renderedComponent = shallow(
      <UsersPage {...usersTableProps} loadUsers={loadUsersSpy} />
    );

    expect(renderedComponent.contains(
      <UsersTable {...usersTableProps} />
    )).toBe(true);
  });

  it('should load users by default', () => {
    shallow(
      <UsersPage
        users={false}
        loadUsers={loadUsersSpy}
      />
    );

    expect(loadUsersSpy).toHaveBeenCalled();
  });

  it('should NOT initially load users if loading', () => {
    shallow(
      <UsersPage
        loading
        users={false}
        loadUsers={loadUsersSpy}
      />
    );

    expect(loadUsersSpy).not.toHaveBeenCalled();
  });

  it('should NOT initially load users if error', () => {
    shallow(
      <UsersPage
        error
        users={false}
        loadUsers={loadUsersSpy}
      />
    );

    expect(loadUsersSpy).not.toHaveBeenCalled();
  });

  describe('maps state/dispatch to props', () => {
    const initialState = {
      usersPage: {
        users: false,
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

    ['loadUsers', 'users', 'error', 'loading'].forEach((propName) => {
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
  });
});
