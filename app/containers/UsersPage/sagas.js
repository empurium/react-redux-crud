/*
 *
 * UsersPage sagas
 *
 * These watch for specific events to come from Redux (takeLatest), fetch the
 * data necessary for the given event, and then finally return it via an action
 * where any number of Components could be listening for it.
 *
 */

import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { LOAD_USERS } from './constants';
import { usersLoaded, usersLoadingError } from './actions';

/**
 * Gets the users
 */
export function* getUsers() {
  const requestURL = 'http://localhost:3001/users';

  try {
    const users = yield call(request, requestURL);
    yield put(usersLoaded(users));
  } catch (err) {
    yield put(usersLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* usersData() {
  // Watches for LOAD_USERS actions and calls getUsers when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_USERS, getUsers);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  usersData,
];
