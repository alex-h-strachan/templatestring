Parse string templates marked with the tag ${}.
This allows strings with the same template tag as
ES6 template strings.  This can be particularly useful
when you don't have direct control of the string.
For example, reading from a file or database where 
you can't cast to a string template.

Note this supports multi-level properties.

ex: 

var templateparser = require('templateparser');

templateparser("hi ${name}, I'm ${package.name}", {name: "user", package: {name: "parser"}});
// expect "hi user, I'm parser.
