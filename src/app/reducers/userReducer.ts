/**
 * Created by ugo on 09/11/16.
 */



import { Action } from 'redux';
import { User } from '../models/user.model';
import * as UserActions from '../actions/UserActions';
import { createSelector } from 'reselect';



export interface UsersState {
    currentUser: User;
};

const initialState: UsersState = {
    currentUser: null
};

export const UsersReducer =
    function(state: UsersState = initialState, action: Action): UsersState {
        switch (action.type) {
            case UserActions.SET_CURRENT_USER:
                const user: User = (<UserActions.SetCurrentUserAction>action).user;
                return {
                    currentUser: user
                };
            default:
                return state;
        }
    };

export const getUsersState = (state): UsersState => state.users;

export const getCurrentUser = createSelector(
    getUsersState,
    ( state: UsersState ) => state.currentUser );
