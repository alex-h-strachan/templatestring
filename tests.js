var parser = require('./templatestring.js');


parseTemplate("hi ${user.name}, you ${status}... ${asdf}", {user: {name: "KC"}, "user.name": "Oops", asdf:"blrrrgh", status: "won"});


parseTemplate("hi ${user.name}, you ${status}... ${asdf}", {user: {name: "KC"}, "user.name": "Oops", asdf:"blrrrgh", status: "won"});