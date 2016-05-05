# Template String
Parse string templates marked with the tag `${}`. This allows strings with the same template tag as ES6 template strings.
This can be particularly useful when you don't have direct control of the string. For example, reading from a file or database where you can't cast to a string template.
The module can also be found <a href = "https://www.npmjs.com/package/templatestring">here on npm</a>
# Example
```javascript
var templatestring = require('templatestring');
templatestring("hi ${name}, I'm ${package.name}", {name: "user", package: {name: "parser"}}); 
// expect "hi user, I'm parser".
```
#Details
The parser will duplicate the result of calling the specified object.
If the object has multiple levels, you can call to them.
```javascript
var templatestring = require('templatestring');
templatestring("${foo.bar}", {foo: {bar: "hi"}}); 
// expect "hi"
```
If you call a property that doesn't exist, you'll get undefined
```javascript
var templatestring = require('templatestring');
templatestring("${foo.bar}", {foo:"bar"}); 
// expect "undefined"
```
If you construct a call to the object that would cause an error, expect an error.
```javascript
var templatestring = require('templatestring');
templatestring("${foo.bar}", {}); 
// expect Error cannot read property "bar" of undefined.
```
It even works with brace notation
```javascript
var templatestring = require('templatestring');
templatestring("${['some property']} or {[0]}", {'some property': "this", 0: "that"}); 
// expect "this or that"
```
You can also define your own matching pattern by passing an options argument.  
By default the pattern start:`\\$\\{` and end `\\}` is used which matches start:`${` end:`}`.

You could, for example, also use start: `\\{\\{` and end `\\}\\}` for start:`{{` end:`}}`.

The extra back slashes are to escape special characters in regex.  
The first is to escape the escape character when converting to string.
The second is to escape the special regex character when converting to regex.  
```javascript
var templatestring = require('templatestring');
templatestring("I can use {{template}}", {template: "handlebars!"}, {start: "\\{\\{", end: "\\}\\}"}); 
// expect "I can use handlebars!"
```
Note: template parser does not 'eval()' anything and is restricted to checking properties of the namespace of the data object passed to it.
As such, it should be safe to use with un-trusted inputs.  
However, this has a down side.  Property names with periods or braces are not supported.
```javascript
var templatestring = require('templatestring');
var str = "This is ${.could}. This is also ${[work}.",
var obj = {'.could': 'defined', '[work': 'defined'},

templatestring(str, obj); 
// expect 'This is undefined. This is also undefined.'
```