YUI.add('read-slides', function (Y, NAME) {
    'use strict';

    function readSlidesAddon(command, adapter, ac) {
        this.fs = require('fs');
        this.ac = ac;
    }
    
    readSlidesAddon.prototype = {
        namespace: 'readSlides',
        
        getSlide: function (n, callback) {
            var basePath = "assets/html/",
                file = "slide" + n + ".html",
                content = "",
                rs = this.fs.createReadStream(basePath + file);
            rs.on("data", function (data) {
                console.log(data);
                content += data;
            }).on("error", function (err) {
                callback({
                    error: "Get error when reading content from slide" + n + ".html"
                });
            }).on("end", function () {
                callback({
                    slide: content
                });
            });
        }
    };

    Y.namespace('mojito.addons.ac').readSlides = readSlidesAddon;

}, '0.0.1', {requires: ['mojito']});