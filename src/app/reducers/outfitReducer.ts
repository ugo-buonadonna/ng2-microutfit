/**
 * Created by ugo on 09/11/16.
 */


import { Action } from 'redux';
import { Outfit } from '../models/outfit.model';
import * as OutfitActions from '../actions/OutfitActions';
import { createSelector } from 'reselect';


export interface OutfitState {
    outfits: Outfit[];
    currentOutfit: Outfit[];
}

const initialState: OutfitState = {
    currentOutfit: null,
    outfits: []
};


export const OutfitReducer = function(state: OutfitState = initialState, action: Action): OutfitState {
    switch (action.type) {
        case OutfitActions.ADD_OUTFIT:
            return {
                outfits: state.outfits.concat((<OutfitActions.AddOutfitAction>action).outfit),
                currentOutfit: state.currentOutfit
            };
        default: return state;
    }
};

export const getOutfitsFromSate = (state): OutfitState => state.outfits;

export const getOutfits = createSelector(
    getOutfitsFromSate,
    ( state: OutfitState ) => state.outfits );
