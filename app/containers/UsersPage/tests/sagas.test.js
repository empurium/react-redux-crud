import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_USERS } from '../constants';
import { usersLoaded, usersLoadingError } from '../actions';
import { getUsers, usersData } from '../sagas';


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

describe('usersData Saga', () => {
  let generator;
  let taskMock;

  beforeEach(() => {
    generator = usersData();
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
