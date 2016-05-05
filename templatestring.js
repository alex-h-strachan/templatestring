"use strict";

function createIndexArray(str) {
    /** Take the index specified in the template and convert it into an array
     *  of indecies that will be applied to the obj argument
     */
    // start by splitting the string on periods or braces.
    // we explicitly claim properties with either character in the name are unsupported.
    var roughArray = str.split(/\.|\[|\]/g); 
    
    var finalArray = [],
        item;
    for(var i = 0; i < roughArray.length; i++) {
        item = roughArray[i];
        if(item !== "") {
            // if property starts and ends with quotes, strip them
            if(/^['"][^]*['"]$/.test(item)){
                finalArray.push(item.substr(1, item.length - 2));
            } else {
                finalArray.push(item);
            }
        }
    }
    return finalArray;
}

module.exports = function(str, obj) {
    str = str || "";
    return str.replace(/\$\{[^}]+\}/g, function(match){
        var keyArray = createIndexArray(match.replace(/^\$\{|}$/g, ""));
        var currentVal = obj;
        for(var i = 0; i < keyArray.length; i++) {
            currentVal = currentVal[keyArray[i]];
        }
        return currentVal;
    });
}
