import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import { Table } from 'reactstrap';

import LoadingIndicator from 'components/LoadingIndicator';
import UserRow from '../UserRow';
import UsersTable from '../index';

describe('<UsersTable />', () => {
  let deleteUserSpy;
  const users = [
    { id: 1, username: 'empurium', email: 'michael@gmail.com', address: '1 Infinite Loop', role: 'admin' },
    { id: 2, username: 'robbie', email: 'robbie@gmail.com', address: '1234 Breakpoint Street', role: 'admin' },
  ];

  beforeEach(() => {
    deleteUserSpy = jest.fn();
  });

  it('should render nothing if nothing given', () => {
    const wrapper = shallow(
      <UsersTable loading={false} error={false} users={false} deleteUser={deleteUserSpy} />
    );

    expect(wrapper.isEmptyRender()).toBeTruthy();
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should not call deleteUser on successful init', () => {
    shallow(
      <UsersTable users={users} deleteUser={deleteUserSpy} />
    );
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should render the loading indicator when its loading', () => {
    const wrapper = shallow(
      <UsersTable loading deleteUser={deleteUserSpy} />
    );

    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should render errors, and no users', () => {
    const wrapper = shallow(
      <UsersTable error deleteUser={deleteUserSpy} />
    );

    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find(FormattedMessage)).toHaveLength(1);
    expect(wrapper.find(Table)).toHaveLength(0);
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should render a list of the correct users', () => {
    const wrapper = shallow(
      <UsersTable error={false} users={users} deleteUser={deleteUserSpy} />
    );

    expect(wrapper.find(Table)).toHaveLength(1);
    expect(wrapper.find('thead')).toHaveLength(1);
    expect(wrapper.find('tbody')).toHaveLength(1);
    expect(wrapper.find(UserRow)).toHaveLength(users.length);
    expect(wrapper.find('tbody').children()).toHaveLength(users.length);
    expect(wrapper.find('tbody').children().first().prop('user')).toEqual(users[0]);
    expect(wrapper.find('tbody').children().last().prop('user')).toEqual(users[1]);
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });

  it('should render with UserRow and pass correct props', () => {
    const userRowProps = {
      user: users[0],
      deleteUser: deleteUserSpy,
    };
    const wrapper = shallow(
      <UsersTable users={users} deleteUser={deleteUserSpy} />
    );

    expect(wrapper.contains(
      <UserRow {...userRowProps} />
    )).toBe(true);
    expect(deleteUserSpy).not.toHaveBeenCalled();
  });
});
