import { fromJS, List, Map } from 'immutable';
import {
  selectUsersPage,
  makeSelectUsers,
  makeSelectUser,
} from '../selectors';


describe('selectUsersPage', () => {
  it('should select the usersPage state', () => {
    const usersPageState = fromJS({});
    const mockedState = fromJS({
      usersPage: usersPageState,
    });

    expect(selectUsersPage(mockedState)).toEqual(usersPageState);
  });
});

describe('makeSelectUsers', () => {
  const users = [
    { title: 'user 1' },
    { title: 'user 2' },
  ];

  it('should select the users', () => {
    const usersSelector = makeSelectUsers();
    const mockedState = fromJS({
      usersPage: {
        users,
      },
    });

    expect(usersSelector(mockedState)).toEqual(users);
  });

  it('should select the users after converting from a List', () => {
    const usersSelector = makeSelectUsers();
    const usersList = new List(users);
    const mockedState = fromJS({
      usersPage: {
        users: usersList,
      },
    });

    expect(usersSelector(mockedState)).toEqual(users);
  });
});

describe('makeSelectUser', () => {
  const user = { id: 1, name: 'Michael' };

  it('should select the user', () => {
    const userSelector = makeSelectUser();
    const mockedState = fromJS({
      usersPage: {
        user,
      },
    });

    expect(userSelector(mockedState)).toEqual(Map(user));
  });
});
