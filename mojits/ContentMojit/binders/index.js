YUI.add('ContentMojitBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {

        init: function (mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function (node) {
            var me = this;
            this.node = node;
            me.loadSlide(1);
            me.mojitProxy.listen("slidechange", function(e) {
                var slideIdx = e.data.slideIdx;
                me.loadSlide(slideIdx);
            });
        },
        
        loadSlide: function (n) {
            var slideIdx,
                uri;
            if (typeof n === "undefined") {
                slideIdx = 1;
            } else {
                slideIdx = n;
            }
            uri = "readslides?n=" + slideIdx;
            Y.io(uri, {
                method: "GET",
                timeout: "10000",
                on: {
                    success: function (id, o) {
                        Y.log(o);
                        var slideHTML = o.responseText;
                        Y.one("#slides").setHTML(slideHTML);
                    },
                    failure: function (id, o) {
                        Y.log(o);
                        alert(o.responseText);
                    }
                }
            });
        }
    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
