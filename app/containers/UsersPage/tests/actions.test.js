import {
  loadUsers,
  usersLoaded,
  usersLoadingError,
  deleteUser,
  userDeleted,
  userDeleteError,
} from '../actions';
import {
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from '../constants';


describe('UsersPage actions', () => {
  describe('Load Users Action', () => {
    it('has a type of LOAD_USERS', () => {
      const expected = {
        type: LOAD_USERS,
      };

      expect(loadUsers()).toEqual(expected);
    });
  });

  describe('Load Users Success Action', () => {
    it('has a type of LOAD_USERS_SUCCESS', () => {
      const users = [
        { title: 'User 1' },
        { title: 'User 2' },
      ];
      const expected = {
        type: LOAD_USERS_SUCCESS,
        users,
      };

      expect(usersLoaded(users)).toEqual(expected);
    });
  });

  describe('Load Users Error Action', () => {
    it('has a type of LOAD_USERS_ERROR', () => {
      const error = 'Some error';
      const expected = {
        type: LOAD_USERS_ERROR,
        error,
      };

      expect(usersLoadingError(error)).toEqual(expected);
    });
  });

  describe('Delete User Action', () => {
    it('has a type of DELETE_USER', () => {
      const expected = {
        type: DELETE_USER,
      };

      expect(deleteUser()).toEqual(expected);
    });
  });

  describe('Delete User Success Action', () => {
    it('has a type of DELETE_USER_SUCCESS', () => {
      const expected = {
        type: DELETE_USER_SUCCESS,
      };

      expect(userDeleted()).toEqual(expected);
    });
  });

  describe('Delete User Error Action', () => {
    it('has a type of DELETE_USER_ERROR', () => {
      const error = 'Some error';
      const expected = {
        type: DELETE_USER_ERROR,
        error,
      };

      expect(userDeleteError(error)).toEqual(expected);
    });
  });
});
