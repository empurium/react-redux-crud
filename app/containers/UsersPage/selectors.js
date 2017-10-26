/*
 *
 * UsersPage selectors
 *
 * These are used as selectors to pull the data any given Component needs directly
 * out of the Redux state to display it.
 *
 * Note that after SSR is complete, the browser will pick up and run these selectors,
 * so they need to intelligently transform immutable the data back to JS.
 *
 */

import { createSelector } from 'reselect';
import { List } from 'immutable';

const selectUsersPage = (state) => state.get('usersPage');

const makeSelectUsers = () => createSelector(
  selectUsersPage,
  (usersState) => {
    const users = usersState.get('users');
    if (List.isList(users)) {
      return users.toJS();
    }

    return users;
  }
);

const makeSelectUser = () => createSelector(
  selectUsersPage,
  (usersState) => usersState.get('user'),
);

export {
  selectUsersPage,
  makeSelectUsers,
  makeSelectUser,
};
