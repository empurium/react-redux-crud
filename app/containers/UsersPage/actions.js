/*
 *
 * UsersPage actions
 *
 * These are used both when dispatching an action into Redux, and for subscribing
 * to Redux state changes so that the Components can update accordingly.
 *
 */

import {
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
} from './constants';

/**
 * Load the users, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_USERS
 */
export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

/**
 * Dispatched when the users are loaded by the request saga
 *
 * @param  {array} users The users data
 *
 * @return {object}      An action object with a type of LOAD_USERS_SUCCESS passing the users
 */
export function usersLoaded(users) {
  return {
    type: LOAD_USERS_SUCCESS,
    users,
  };
}

/**
 * Dispatched when loading the users fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_USERS_ERROR passing the error
 */
export function usersLoadingError(error) {
  return {
    type: LOAD_USERS_ERROR,
    error,
  };
}
