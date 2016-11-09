'use strict';

module.exports = function(Outfit) {

    /**
     * This callback type is called `outfitCallback` and is displayed as a global symbol.
     *
     * @callback outfitCallback
     * @param {Error} Error
     * @param {array} outfit arrays
     */

    /**
     * Retrieves all public available outfits
     * @param {outfitCallback} callback
     */
    Outfit.public = function(callback) {
         Outfit.find({ where: { public: true}},callback);
    };

};
