"use strict";

module.exports = function(str, obj) {
    str = str || "";
    return str.replace(/\$\{[^}]+\}/g, function(match){
        var keyArray = match.replace(/^\$\{|}$/g, "").split(".");
        var currentVal = obj;
        for(var i = 0; i < keyArray.length; i++) {
            currentVal = currentVal[keyArray[i]];
        }
        return currentVal;
    });
}
