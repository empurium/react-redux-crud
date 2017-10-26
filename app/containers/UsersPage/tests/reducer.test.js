import { fromJS } from 'immutable';

import usersPageReducer from '../reducer';
import {
  loadUsers,
  usersLoaded,
  usersLoadingError,
  deleteUser,
  userDeleted,
  userDeleteError,
} from '../actions';

describe('usersPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: true,
      error: false,
      users: false,
      user: false,
    });
  });

  it('returns the initial state', () => {
    const expectedState = state;

    expect(usersPageReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle the loadUsers action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .set('users', false)
      .set('user', false);

    expect(usersPageReducer(state, loadUsers())).toEqual(expectedResult);
  });

  it('should handle the usersLoaded action correctly', () => {
    const users = [
      { title: 'User 1' },
      { title: 'User 2' },
    ];
    const expectedResult = state
      .set('users', users)
      .set('loading', false)
      .set('error', false)
      .set('user', false);

    expect(usersPageReducer(state, usersLoaded(users))).toEqual(expectedResult);
  });

  it('should handle the usersLoadingError action correctly', () => {
    const error = 'Some error';
    const expectedResult = state
      .set('error', error)
      .set('loading', false)
      .set('user', false);

    expect(usersPageReducer(state, usersLoadingError(error))).toEqual(expectedResult);
  });

  it('should handle the deleteUser action correctly', () => {
    const user = { id: 1, name: 'Michael' };
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .set('users', false)
      .set('user', user);

    expect(usersPageReducer(state, deleteUser(user))).toEqual(expectedResult);
  });

  it('should handle the userDeleted action correctly', () => {
    const expectedResult = state
      .set('loading', false)
      .set('error', false)
      .set('users', false)
      .set('user', false);

    expect(usersPageReducer(state, userDeleted())).toEqual(expectedResult);
  });

  it('should handle the userDeletedError action correctly', () => {
    const error = 'Some error';
    const expectedResult = state
      .set('error', error)
      .set('loading', false)
      .set('user', false);

    expect(usersPageReducer(state, userDeleteError(error))).toEqual(expectedResult);
  });
});
