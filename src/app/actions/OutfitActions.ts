/**
 * Created by ugo on 09/11/16.
 */


import {Action, ActionCreator} from 'redux';
import {Outfit} from '../models/outfit.model';

export const ADD_OUTFIT = '[Outfit] Add';
// export const GET_PUBLIC_OUTFITS = '[Outfit] Get Public';
// export const GET_USER_OUTFITS = '[Outfit] Get Public';

export interface AddOutfitAction extends Action {
    outfit: Outfit;
}

export const addOutfit: ActionCreator<AddOutfitAction> =
    (outfitArgs: Outfit): AddOutfitAction => {
    const defaults = {
       name: ' ddefault outfit'
    };

    const outfit = new Outfit(Object.assign({}, defaults, outfitArgs));

    return {
        type: ADD_OUTFIT,
        outfit: outfit
    };

};
