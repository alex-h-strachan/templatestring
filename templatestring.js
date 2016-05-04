module.exports = function(str, obj) {
    return str.replace(/\$\{[^}]+\}/g, function(str){
        var keyArray = objKey.replace(/[\{\}\$]/g, "").split(".");
        var currentVal = obj;
        for(var i = 0; i < keyArray.length; i++) {
            currentVal = currentVal[keyArray[i]];
        }
        return currentVal;
    });
}
