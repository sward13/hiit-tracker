var com = com ? com : {};

if (!com.postarchitectural) {
    com.postarchitectural = {};
}

// a simple infowindow class
com.postarchitectural.infoWindow = function(elementName) {
    var infoWindow = {},
        selector = elementName,
        closeSelector = elementName + " .close",
        infoSelector = $(selector),
        selection = null,
        offset = {x:.5, y: -45},
        
    var location = null;
        
    function update(e) {
        if (map && location) {
            var pt = map.locationPoint(location);
            var offy = Math.abs(offset.y) <= 1 ? (offset.y * infoSelector.height()) : offset.y;
            var offx = Math.abs(offset.x) <= 1 ? (offset.x * infoSelector.width()) : offset.x;
            infoWindow.move(pt.x - offx, pt.y - infoSelector.height() - offy);
        }
    }
    
    infoWindow.clear = function() {
        location = null;
        selection = null;
        
        if (map) {
            map.off("move", update);
        }
        
        infoWindow.hide();
        
        return infoWindow;
    };
    
    infoWindow.selector = function(s) {
        if (!s) return selector;
        
        selector = s;
        infoSelector = $(selector);
        $(selector + " .close").click(infoWindow.clear);
        
        return infoWindow;
    };
    
    infoWindow.closeSelctor = function(c) {
        if (!c) return closeSelector;
        
        closeSelect = c;
        $(c).click(infoWindow.clear);
        return infoWindow;
    };
    
    // update the offset
    infoWindow.offset = function(o) {
        if (!o) return offset;
        
        offset = o;
        return infoWindow;
    };
    
    // attach to a location
    infoWindow.location = function(l) {
        if (!l)   return location;
        
        location = l;
        
        if (map) {
            map.on("move", update);   
            update();
        }
        
        return infoWindow;
    };
    
    infoWindow.hide = function() {
        infoSelector.hide();
        return infoWindow;
    };
    
    infoWindow.show = function() {
        infoSelector.show();
        return infoWindow;
    };
    
    // manually move with offset
    infoWindow.moveTip = function(x, y) {
        var offy = Math.abs(offset.y) <= 1 ? (offset.y * infoSelector.height()) : offset.y;
        var offx = Math.abs(offset.x) <= 1 ? (offset.x * infoSelector.width()) : offset.x;
        infoWindow.move(x - offx, y - infoSelector.height() - offy);
        return infoWindow;
    }
    
    // update position
    infoWindow.move = function(x, y) {
        infoSelector.css('left',  x).css('top', y);
        return infoWindow;
    };
    
    // sets the selection
    infoWindow.selection = function(s) {
        if (!s) return selection;
        
        selection = s;
        return infoWindow;
    };
    
    // updates the contents of the infoSelector
    infoWindow.html = function(h, e) {
        if (!h) return html;
        
        html = h;
        if (e) {
            $(e).html(h);
        } else {
            infoSelector.html(h);    
        }
        return infoWindow;
    };
    
    infoWindow.selector(elementName);
    
    return infoWindow;
};