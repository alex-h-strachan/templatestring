"use strict";

/** 
 *  Take the index specified in the template and convert it into an array
 *  of indecies that will be applied to the obj argument
 */

function createIndexArray(str) {
    var finalArray = [],
        item;
        
    /**
     *  Start by splitting the string on periods or braces.
     *  We make accept that this will break property names with .'s in them.
     *  This is described in the readme.md under 'advanced'
     */
    var roughArray = str.split(/\.|\[|\]/g); 
        
    for (var i = 0; i < roughArray.length; i++) {
        item = roughArray[i];
        if (item !== "") {
            // if property starts and ends with quotes, strip them
            if (/^['"][^]*['"]$/.test(item)) {
                finalArray.push(item.substr(1, item.length - 2));
            } else {
                finalArray.push(item);
            }
        }
    }
    return finalArray;
}

function parser(str, obj, options) {
    var options = options || {}
    
    var start = options.start || "\\$\\{";
    var end = options.end || "\\}";
    
    var matchPattern = new RegExp(start + '[^' + end + ']+' + end, "g");
    var stripPattern = new RegExp('^' + start + "|" + end + '$', "g");

    str = str || "";
    /**
     *  Set up the replacements to swap out the templates.
     */
    return str.replace(matchPattern, function(match) {
        var keyArray = createIndexArray(match.replace(stripPattern, ""));
        var currentVal = obj;
        /**
         *  Itterate throught the keys
         */
        for (var i = 0; i < keyArray.length; i++) {
            currentVal = currentVal[keyArray[i]];
        }
        
        if(options.encode === true) {
            return encodeURIComponent(currentVal);
        } else {
            return currentVal;
        }
    });
}

module.exports = parser;