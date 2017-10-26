/*
 *
 * UsersPage reducers
 *
 * These are used to watch specific types of events occurring in Redux, and only
 * act upon the events that we care about. They will modify the Redux state as
 * needed based on the given event.
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: false,
  users: false,
  user: false,
});

function usersPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('users', false);
    case LOAD_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('users', action.users);
    case LOAD_USERS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case DELETE_USER:
      return state
        .set('loading', true)
        .set('error', false)
        .set('user', action.user);
    case DELETE_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('user', false);
    case DELETE_USER_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
        .set('user', false);
    default:
      return state;
  }
}

export default usersPageReducer;
