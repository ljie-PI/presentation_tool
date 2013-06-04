YUI.add('keyboard-action', function (Y, NAME) {
    'use strict';
    
    function KeyboardAction(config) {
        KeyboardAction.superclass.constructor.apply(this, arguments);
    }
    
    KeyboardAction.NAME = "keyaction";
    KeyboardAction.NS = "keyaction";
    
    KeyboardAction.ATTRS = {
        menuList: [],
        slideIdx: 1,
        slideCount: 1,
        titleNode: null,
        callback: function (idx) {}
    };
    
    Y.extend(KeyboardAction, Y.Plugin.Base, {
        _menuList: [],
        _slideIdx: 1,
        _slideCount: 1,
        
        initializer: function () {
            this._menuList = this.get("menuList");
            Y.log("menuList is " + this.get("menuList"));
            this._slideIdx = this.get("slideIdx");
            Y.log("slideIdx is " + this.get("slideIdx"));
            this._slideCount = this.get("slideCount");
            Y.log("slideCount is " + this.get("slideCount"));
        },
        
        onKeyUp: function (e) {
            var keycode = e.keyCode;
            if (keycode === 37) {
                // left key
                this.onKeyLeft();
            } else if (keycode === 39) {
                // right key
                this.onKeyRight();
            }
        },
        
        onKeyLeft: function () {
            if (this._slideIdx === 1) {
                return;
            }
            this.get("titleNode").setHTML(this._menuList[this._slideIdx-2]);
            this._slideIdx -= 1;
            this.get("callback")(this._slideIdx);
        },
        
        onKeyRight: function () {
            if (this._slideIdx === this._slideCount) {
                return;
            }
            this.get("titleNode").setHTML(this._menuList[this._slideIdx]);
            this._slideIdx += 1;
            this.get("callback")(this._slideIdx);
        },
        
        setSlideIdx: function (n) {
            this._slideIdx = n;
        }
    });
    
    Y.namespace("Plugin").KeyboardAction = KeyboardAction;
    
}, '0.0.1', {requires: ["json", "plugin"]});
