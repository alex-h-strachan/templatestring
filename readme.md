# Template String
Parse string templates marked with the tag`${}`. This allows strings with the same template tag as ES6 template strings.
This can be particularly useful when you don't have direct control of the string. For example, reading from a file or database where you can't cast to a string template.
# Example
```javascript
var templateparser = require('templateparser');
templateparser("hi ${name}, I'm ${package.name}", {name: "user", package: {name: "parser"}}); 
// expect "hi user, I'm parser.
```
#Details
The parser will duplicate the result of calling the specified object.
If the object has multiple levels, you can call to them.
```javascript
var templateparser = require('templateparser');
templateparser("${foo.bar}", {foo: {bar: "hi"}}); 
// expect "hi"
```
If you call a property that doesn't exist, you'll get undefined
```javascript
var templateparser = require('templateparser');
templateparser("${foo.bar}", {foo:"bar"}); 
// expect "undefined"
```
If you construct a call to the object that would cause an error, expect an error.
```javascript
var templateparser = require('templateparser');
templateparser("${foo.bar}", {}); 
// expect Error cannot read property "bar" of undefined.
```