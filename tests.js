var templateparser = require('./templatestring.js');

var template = "hi ${name}, I'm ${module.name}"
var obj = {name: "User", module: {name: "templateparser", description: "foo"}};
console.log(templateparser(template, obj));