import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_USERS, DELETE_USER, DELETE_USER_SUCCESS } from '../constants';
import { usersLoaded, usersLoadingError, userDeleted, userDeleteError } from '../actions';
import { getUsers, deleteUser, watchLoadUsers, watchDeleteUser, watchDeleteUserSuccess } from '../sagas';


/* eslint-disable redux-saga/yield-effects */
describe('getUsers Saga', () => {
  let getUsersGenerator;

  beforeEach(() => {
    getUsersGenerator = getUsers();

    const callDescriptor = getUsersGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the usersLoaded action if it requests the data successfully', () => {
    const users = [
      { id: 1, username: 'empurium', email: 'michael@gmail.com', address: '1 Infinite Loop', role: 'admin' },
      { id: 2, username: 'robbie', email: 'robbie@gmail.com', address: '1234 Breakpoint Street', role: 'admin' },
    ];
    const putDescriptor = getUsersGenerator.next(users).value;
    expect(putDescriptor).toEqual(put(usersLoaded(users)));
  });

  it('should call the usersLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getUsersGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(usersLoadingError(response)));
  });
});

describe('deleteUser Saga', () => {
  let deleteUserGenerator;
  const user = { id: 1, name: 'Michael' };

  beforeEach(() => {
    deleteUserGenerator = deleteUser(user);

    const callDescriptor = deleteUserGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the deleteUser action if the request is successful', () => {
    deleteUserGenerator.next(user);

    const putDescriptor = deleteUserGenerator.next().value;
    expect(putDescriptor).toEqual(put(userDeleted()));
  });

  it('should call the userDeleteError action if the response errors', () => {
    const response = new Error('Some error');
    deleteUserGenerator.next(user);

    const putDescriptor = deleteUserGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(userDeleteError(response)));
  });
});


describe('watchLoadUsers Saga', () => {
  let generator;
  let taskMock;

  beforeEach(() => {
    generator = watchLoadUsers();
    taskMock = createMockTask();
  });

  it('should start task to watch for LOAD_USERS action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_USERS, getUsers));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    generator.next();
    const takeDescriptor = generator.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel after LOCATION_CHANGE action', () => {
    generator.next();
    generator.next(taskMock);
    const cancelDescriptor = generator.next();
    expect(cancelDescriptor.value).toEqual(cancel(taskMock));
  });
});

describe('watchDeleteUser Saga', () => {
  let generator;

  beforeEach(() => {
    generator = watchDeleteUser();
  });

  it('should start task to watch for DELETE_USER action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(DELETE_USER, deleteUser));
  });
});

describe('watchDeleteUserSuccess Saga', () => {
  let generator;

  beforeEach(() => {
    generator = watchDeleteUserSuccess();
  });

  it('should start task to watch for DELETE_USER_SUCCESS action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(DELETE_USER_SUCCESS, getUsers));
  });
});
