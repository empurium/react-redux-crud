import { fromJS, List } from 'immutable';
import {
  selectUsersPage,
  makeSelectUsers,
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
  it('should select the users', () => {
    const usersSelector = makeSelectUsers();
    const users = [
      { title: 'user 1' },
      { title: 'user 2' },
    ];
    const mockedState = fromJS({
      usersPage: {
        users,
      },
    });

    expect(usersSelector(mockedState)).toEqual(users);
  });

  it('should select the users after converting from a List', () => {
    const usersSelector = makeSelectUsers();
    const users = [
      { title: 'user 1' },
      { title: 'user 2' },
    ];
    const usersList = new List(users);
    const mockedState = fromJS({
      usersPage: {
        users: usersList,
      },
    });

    expect(usersSelector(mockedState)).toEqual(users);
  });
});
