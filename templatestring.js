"use strict";

function cache_length(l) {
    // update the cache length
    if(l && !isNaN(parseInt(l))) {
        cache.updateMaxLenght(l);
    }
    // return the parser so we can require use the function in the requrire
    return parser;
}

function parser(str, obj, options) {
    str = str || "";

    if(cache.compiled_templates[str] === undefined) {
        // template is new and isn't cached
        var options = options || {}

        // make a copy of the original
        var str_copy = str;
        
        // configure the regex
        var start = options.start || "\\$\\{";
        var end = options.end || "\\}";
        
        // match the last match in the string first
        var matchPattern = new RegExp(start + '[^' + end + ']+' + end);

        // Pattern to strip the markers
        var stripPattern = new RegExp('^' + start + '|' + end + '$', 'g');

        // declare variables
        var match,
            matches = [],
            indexAdjustment = 0,
            matchString = '',
            start_index = 0,
            propertyName = '',
            length = 0;

        // find the first match in the string
        match = str.match(matchPattern);
        matches = [];
        indexAdjustment = 0;

        while(match) {
            matchString = match[0];
            start_index = match.index + indexAdjustment;
            propertyName = matchString.replace(stripPattern, '');
            length = matchString.length;
            matches.push({
                propertyName: propertyName,
                start: start_index,
                length: length
            });

            str_copy = str_copy.substr(match.index + length)
            indexAdjustment += (match.index + length);
            
            match = str_copy.match(matchPattern);
        }
        cache.add(str, matches);

    }

    var result = cache.run(str, obj, options);
    cache.trim();

    return result;
}

var cache = new Cache();

// define the cache
function Cache() {
    var _max_length = 0;

    this.queue = [];

    this.compiled_templates = {};

    this.add = function(original, markers) {
        var index = this.queue.length;
        this.queue.push(original)
        this.compiled_templates[original] = {
            markers: markers.sort((a,b) => {
                return b.start - a.start
            })
        };
    }

    this.run = function(original, obj, opts) {
        opts = opts || {};
        var output = original;
        var template = this.compiled_templates[original];

        var after = '',
            current = output;

        // note the markers are run back to front
        template.markers.forEach(function(marker) {
            after = findProperty(obj, marker.propertyName, opts) + current.substr(marker.start + marker.length) + after;
            current = output.substr(0, marker.start);
        });

        return current + after;
    }

    this.trim = function() {
        while(this.queue.length > _max_length) {
            var stale = this.queue.shift()
            this.compiled_templates[stale] = undefined;
            delete this.compiled_templates[stale];
        }
    }

    this.updateMaxLenght = function(max_length_option) {
        _max_length = max_length_option;
        this.trim();
    }

    function findProperty(obj, propertyString, opts) {
        var keyArray = createIndexArray(propertyString);
        var currentVal = obj;
        /**
         *  Itterate throught the keys
         */
        for (var i = 0; i < keyArray.length; i++) {
            currentVal = currentVal[keyArray[i]];
        }
        
        if(opts.encode === true) {
            return encodeURIComponent(currentVal);
        } else if(opts.encode === 'postgres') {
            return encodeURIComponent(currentVal).replace(/'/g, "''");
        } else {
            return currentVal;
        }
    }

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
}

module.exports = parser;
module.exports.cache_length = cache_length;