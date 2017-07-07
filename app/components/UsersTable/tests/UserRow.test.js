import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import UserRow from '../UserRow';


describe('<User />', () => {
  let wrapper;
  const user = {
    id: 1,
    username: 'empurium',
    email: 'michael@gmail.com',
    address: '1 Infinite Loop',
    role: 'admin',
  };

  beforeEach(() => {
    wrapper = shallow(
      <UserRow user={user} />
    );
  });

  it('should render', () => {
    expect(wrapper.find(UserRow)).toBeTruthy();
  });

  it('should render with the username as a link', () => {
    expect(wrapper.contains(
      <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
    )).toBeTruthy();
  });

  it('should render the correct user data', () => {
    expect(wrapper.contains(<td>{user.id}</td>)).toBeTruthy();
    expect(wrapper.contains(<td>{user.email}</td>)).toBeTruthy();
    expect(wrapper.contains(<td>{user.address}</td>)).toBeTruthy();
    expect(wrapper.contains(<td>{user.role}</td>)).toBeTruthy();
  });
});
