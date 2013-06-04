/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('HeaderMojitModelFoo', function(Y, NAME) {

/**
 * The HeaderMojitModelFoo module.
 *
 * @module HeaderMojit
 */

    /**
     * Constructor for the HeaderMojitModelFoo class.
     *
     * @class HeaderMojitModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getMenuList: function (ac, callback) {
            var me = this,
                fs = require('fs'),
                basePath = "assets/html/",
                slideSeqRegex = /slide(\d*)\.html/,
                titleRegex = /<h3>(.*?)<\/h3>/;
            me.menuList = [];
            fs.readdir(basePath, function (err, files) {
                var fileCount = files.length;
                Y.log("Files in " + basePath + "are :" + Y.JSON.stringify(files));
                files.forEach(function (item) {
                    Y.log("Get title from file " + item);
                    var slideSeqExec = slideSeqRegex.exec(item),
                        slideSeq,
                        titleExec,
                        title,
                        readStream,
                        readBuf = "";
                    if (slideSeqExec) {
                        slideSeq = parseInt(slideSeqExec[1]) - 1;
                        Y.log("This is the " + slideSeq + "th element of the menu list");
                    }
                    readStream = fs.createReadStream(basePath + item);
                    readStream.on("data", function (data) {
                        readBuf += data;
                        titleExec = titleRegex.exec(readBuf);
                        if (titleExec) {
                            title = titleExec[1];
                            Y.log("The title is " + title);
                        }
                    }).on("error", function (err) {
                        title = "No title";
                        me.menuList[slideSeq] = title;
                        me.checkFinish(fileCount, callback);
                    }).on("end", function () {
                        me.menuList[slideSeq] = title;
                        me.checkFinish(fileCount, callback);
                    });
                })
            });
                
        },
        
        checkFinish: function (fileCount, callback) {
            var me = this;
            Y.log("me.menuList.length is " + me.menuList.length);
            Y.log("fileCount is " + fileCount);
            if (me.menuList.length === fileCount) {
                var i,
                    allFilled = true;
                for (i=0; i<me.menuList.length; i+=1) {
                    if (typeof me.menuList[i] === "undefined") {
                        Y.log("the " + i + "th element is undefined");
                        allFilled = false;
                    }
                }
                if (allFilled) {
                    callback(me.menuList);
                }
            }
        }

    };

}, '0.0.1', {requires: ['json']});
