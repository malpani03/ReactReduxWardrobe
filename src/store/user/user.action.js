import USER_ACTION_TYPES from './user.types';
import { createAction } from '../../utils/reducers/reducers.util';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);