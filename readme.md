# Template String
Parse string templates.  By default it uses the `${}` tag. This provides functionality similar to ES6 template strings with standard js strings.
This can be particularly useful when you don't have direct control of the string. For example, reading from a file or database where you can't cast to a string template.
The tag marker for templates can be configured using an options object specifying a start and end pattern.  See Advanced for examples.
The module can also be found <a href = "https://www.npmjs.com/package/templatestring">here on npm</a>
# Example
```javascript
var templatestring = require('templatestring');
templatestring("hi ${name}, I'm ${package.name}", {name: "user", package: {name: "parser"}}); 
// expect "hi user, I'm parser".
```
# Caching
New! 

Templatestring will perform greedy caching on any parsed templates.  Any subsequent runs of the template are 10x faster than the first run.
Set the cache length to any integer to control maximum memory consumption, if needed.

```javascript
var templatestring = require('templatestring').cache_length(10000);
templatestring("hi ${name}, I'm ${package.name}", {name: "user", package: {name: "parser"}}); 
// expect "hi user, I'm parser".
```
#Details
Multi-level objects work as template names.
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
templatestring("${['some property']} or ${[0]}", {'some property': "this", 0: "that"}); 
// expect "this or that"
```
#Advanced
You can also define your own matching pattern by passing an options argument.  
By default the pattern start:`\\$\\{` and end `\\}` is used which matches start: `${` end: `}`.

You could, for example, also use start: `\\{\\{` and end `\\}\\}` for start: `{{` end: `}}`.

The extra back slashes are to escape special characters in regex.  
The first is to escape the escape character when converting to string.
The second is to escape the special regex character when converting to regex.  
```javascript
var templatestring = require('templatestring');
templatestring("I can use {{template}}", {template: "handlebars!"}, {start: "\\{\\{", end: "\\}\\}"}); 
// expect "I can use handlebars!"
```
Another example: `<%%>` templates.
```javascript
var templatestring = require('templatestring');
templatestring("I can use <%template%>", {template: "<%-style templates!"}, {start: "<%", end: "%>"}); 
// expect "I can use <%-style templates!"
```
Another example: python templates.
```javascript
var templatestring = require('templatestring');
templatestring("I {0} {1} {2} brackets", ["can", "use", "python" ], {start: "\\{", end: "\\}"}); 
// expect "I can use python brackets"
```
Safely encode results with encodeURIComponent.
```javascript
var templatestring = require('templatestring');
templatestring("encode ${specialChars}", {specialChars: '%$` '}, {encode: true}); 
// expect "encode %25%24%60%20"
```
Safely encode results for postgres.
```javascript
var templatestring = require('templatestring');
templatestring("encode ${specialChars}", {specialChars: '%$`\'\' '}, {encode: 'postgres'}); 
// expect "encode %25%24%60\'\'\'\'%20"
```
#Caveat
Template parser does not 'eval()' anything and is restricted to checking properties of the namespace of the data object passed to it.
As such, it should be safe to use with un-trusted inputs.  
However, as a consequence, property names with ['s or .'s are not supported
```javascript
var templatestring = require('templatestring');
var str = "This is ${.could}. This is also ${[work}.";
var obj = {'.could': 'defined', '[work': 'defined'};

templatestring(str, obj); 
// expect 'This is undefined. This is also undefined.'
```

Caching has also introduced some overhead into the first run of a template:
if you need the speed of the old parser, and caching won't help your use case, you can still use 
```javascript
var templatestring = require('templatestring').legacy;
templatestring("hi ${name}, I'm ${package.name}", {name: "user", package: {name: "parser"}}); 
// expect "hi user, I'm parser".
```