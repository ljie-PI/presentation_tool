YUI.add('HeaderMojit', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        index: function(ac) {
            ac.models.HeaderMojitModelFoo.getMenuList(ac, function (menuList) {
                ac.assets.addCss('./index.css');
                ac.instance.config.menuList = menuList;
                ac.done({
                    defTitle: "What is Mojito?"
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'HeaderMojitModelFoo']});
