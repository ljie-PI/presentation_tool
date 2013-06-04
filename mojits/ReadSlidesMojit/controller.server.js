/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('ReadSlidesMojit', function(Y, NAME) {

/**
 * The ReadSlidesMojit module.
 *
 * @module ReadSlidesMojit
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            ac.assets.addCss('./index.css');
            
            var slideNum = ac.params.getFromMerged("n");
            if (typeof slideNum === "undefined") {
                slideNum = 1;
            }
            ac.readSlides.getSlide(slideNum, function (retObj) {
                if (typeof retObj.error !== "undefined") {
                    ac.error(retObj.error);
                } else {
                    ac.done(retObj.slide);
                }
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'read-slides', 'json']});
