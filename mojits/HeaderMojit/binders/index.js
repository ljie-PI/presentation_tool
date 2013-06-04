YUI.add('HeaderMojitBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {

        init: function (mojitProxy) {
            this.mojitProxy = mojitProxy;
        },
        
        bind: function (node) {
            this.node = node;
            var me = this;
            me.slideIdx = 1;
            me.menuList = me.mojitProxy.config.menuList;
            me.slideCount = me.menuList.length;
            me.buildMenuList();
            Y.log("me.menuList is " + Y.JSON.stringify(me.menuList));
            Y.log("me.slideIdx is " + Y.JSON.stringify(me.slideIdx));
            Y.log("me.slideCount is " + Y.JSON.stringify(me.slideCount));
            this.node.one("#slide-title").on("click", me.clickSlideTitle, this);
            this.node.one("#menu-list").delegate("mouseover", me.itemNodeHover, ".item-node", me);
            this.node.one("#menu-list").delegate("click", me.itemNodeSelect, ".item-node", me);
            this.node.one("#prev-slide").on("click", me.clickPrevSlide, this);
            this.node.one("#next-slide").on("click", me.clickNextSlide, this); 
            // using Plugin here to present how to use YUI plugin
            this.node.plug(Y.Plugin.KeyboardAction, { 
                menuList: me.menuList,
                slideIdx: me.slideIdx,
                slideCount: me.slideCount,
                titleNode: this.node.one("#slide-title"),
                callback: function (idx) {
                    me.slideIdx = idx;
                    me.mojitProxy.broadcast('slidechange', {slideIdx: me.slideIdx});
                }
            });
            Y.on("keyup", this.node.keyaction.onKeyUp, "body", this.node.keyaction);
        },
        
        buildMenuList: function () {
            var me = this,
                menuListDiv = Y.one("#menu-list"),
                i;
            for (i=0; i<me.slideCount; i+=1) {
                var itemNode = Y.Node.create('<li class="item-node">' + me.menuList[i] + '</li>');
                menuListDiv.appendChild(itemNode);
            }
            menuListDiv.setStyle("display", "none");
        },
        
        clearHighlight: function (listNode) {
            var me = this,
                itemNodeList = listNode.all(".item-node");
            itemNodeList.each(function (item) {
                if (item.hasClass("highlight")) {
                    item.removeClass("highlight");
                }
            });
        },
        
        clickSlideTitle: function () {
            var me = this,
                menuListDiv = Y.one("#menu-list");
            if (menuListDiv.getStyle("display") === "none") {
                menuListDiv.setStyle("display", "block");
                me.clearHighlight(menuListDiv);
            } else {
                menuListDiv.setStyle("display", "none");
            }
        },
        
        itemNodeHover: function (e) {
            var me = this,
                targetNode = e.target;
            me.clearHighlight(targetNode.ancestor("ul"));
            targetNode.addClass("highlight");
        },
        
        itemNodeSelect: function (e) {
            var me = this,
                targetNode = e.target,
                menuListDiv = targetNode.ancestor("ul"),
                slideIdx;
            Y.one("#slide-title").setHTML(targetNode.getHTML());
            menuListDiv.setStyle("display", "none");
            slideIdx = parseInt(menuListDiv.all("li").indexOf(targetNode)) + 1;
            me.slideIdx = slideIdx;
            me.node.keyaction.setSlideIdx(me.slideIdx);
            me.mojitProxy.broadcast('slidechange', {slideIdx: slideIdx});
        },
        
        clickNextSlide: function (e) {
            var me = this;
            if (me.slideIdx === me.slideCount) {
                return;
            }
            Y.one("#slide-title").setHTML(me.menuList[me.slideIdx]);
            me.slideIdx += 1;
            me.node.keyaction.setSlideIdx(me.slideIdx);
            me.mojitProxy.broadcast('slidechange', {slideIdx: me.slideIdx});
        }, 
        
        clickPrevSlide: function (e) {
            var me = this;
            if (me.slideIdx === 1) {
                return;
            }
            Y.one("#slide-title").setHTML(me.menuList[me.slideIdx-2]);
            me.slideIdx -= 1;
            me.node.keyaction.setSlideIdx(me.slideIdx);
            me.mojitProxy.broadcast('slidechange', {slideIdx: me.slideIdx});
        }

    };

}, '0.0.1', {requires: ['event-mouseenter',
                        'mojito-client',
                        'node',
                        'keyboard-action',
                        'event-key']});
