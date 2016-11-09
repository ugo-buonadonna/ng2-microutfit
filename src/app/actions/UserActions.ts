/**
 * Created by ugo on 09/11/16.
 */


import {
    Action,
    ActionCreator
} from 'redux';
import {
    User
} from '../models/user.model';

/**
 * UserActions specifies action creators concerning Users
 */
export const SET_CURRENT_USER = '[User] Set Current';
export interface SetCurrentUserAction extends Action {
    user: User;
}
export const setCurrentUser: ActionCreator<SetCurrentUserAction> =
    (user) => ({
        type: SET_CURRENT_USER,
        user: user
    });
