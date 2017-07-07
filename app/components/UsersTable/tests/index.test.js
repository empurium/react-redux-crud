import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import { Table } from 'reactstrap';

import LoadingIndicator from 'components/LoadingIndicator';
import UserRow from '../UserRow';
import UsersTable from '../index';

describe('<UsersTable />', () => {
  it('should render nothing if nothing given', () => {
    const wrapper = shallow(
      <UsersTable loading={false} error={false} users={false} />
    );

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should render the loading indicator when its loading', () => {
    const wrapper = shallow(
      <UsersTable loading />
    );

    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
  });

  it('should render errors, and no users', () => {
    const wrapper = shallow(
      <UsersTable error />
    );

    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find(FormattedMessage)).toHaveLength(1);
    expect(wrapper.find(Table)).toHaveLength(0);
  });

  it('should render a list of the correct users', () => {
    const users = [
      { id: 1, username: 'empurium', email: 'michael@gmail.com', address: '1 Infinite Loop', role: 'admin' },
      { id: 2, username: 'robbie', email: 'robbie@gmail.com', address: '1234 Breakpoint Street', role: 'admin' },
    ];
    const wrapper = shallow(
      <UsersTable error={false} users={users} />
    );

    expect(wrapper.find(Table)).toHaveLength(1);
    expect(wrapper.find('thead')).toHaveLength(1);
    expect(wrapper.find('tbody')).toHaveLength(1);
    expect(wrapper.find(UserRow)).toHaveLength(users.length);
    expect(wrapper.find('tbody').children()).toHaveLength(users.length);
    expect(wrapper.find('tbody').children().first().prop('user')).toEqual(users[0]);
    expect(wrapper.find('tbody').children().last().prop('user')).toEqual(users[1]);
  });
});
