/**
 * Created by ugo on 09/11/16.
 */

import {
    combineReducers,
    Reducer
} from 'redux';
import {UsersReducer, UsersState} from './userReducer';
import {OutfitReducer, OutfitState} from './outfitReducer';

export interface AppState {
    users: UsersState;
    outfits: OutfitState;
}



const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    users: UsersReducer,
    outfits: OutfitReducer
});

export default rootReducer;
