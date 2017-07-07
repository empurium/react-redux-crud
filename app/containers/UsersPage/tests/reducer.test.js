import { fromJS } from 'immutable';

import usersPageReducer from '../reducer';
import {
  loadUsers,
  usersLoaded,
  usersLoadingError,
} from '../actions';

describe('usersPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: true,
      error: false,
      users: false,
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
      .set('users', false);

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
      .set('error', false);

    expect(usersPageReducer(state, usersLoaded(users))).toEqual(expectedResult);
  });

  it('should handle the usersLoadingError action correctly', () => {
    const error = 'Some error';
    const expectedResult = state
      .set('error', error)
      .set('loading', false);

    expect(usersPageReducer(state, usersLoadingError(error))).toEqual(expectedResult);
  });
});
