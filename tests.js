var templateparser = require('./templatestring.js');
"use strict";

var tests = {
    "one-layer object":{
        str: "hi ${foo}",
        obj: {foo: "bar"},
        expect: "hi bar"
    },
    "two-layer object":{
        str: "hi ${foo.bar}",
        obj: {foo: {bar: "whack"}},
        expect: "hi whack"
    },
    "repeated two-layer object":{
        str: "hi ${foo.bar}, this is ${foo.bar}",
        obj: {foo: {bar: "whack"}},
        expect: "hi whack, this is whack"
    },
    "null string test":{
        str: undefined,
        obj: {foo: "bar"},
        expect: ""
    },
    "null obj test":{
        str: "foo",
        obj: undefined,
        expect: "foo"
    },
    "null property test":{
        str: "${foo}",
        obj: {},
        expect: "undefined"
    },
    "special characters":{
        str: "${a}${1}${!}${$}",
        obj: {a:"foo", 1: "bar", "!": "foobar", "$": "taco"},
        expect: "foobarfoobartaco"
    },
    "bracket indexed properties":{
        str: "${['some property']} or ${[0]}",
        obj: {'some property': "this", 0: "that"},
        expect: "this or that"
    },
    "property names containing [ or .":{
        str: "This is ${.could}. This is also ${[work}.",
        obj: {'could.work': 'defined', 'could[work': 'defined'},
        expect: 'This is undefined. This is also undefined.'
    },
    "dangerous strings":{
        str: 'this has ${first}, ${second}, ${third}, ${fourth} and ${fifth} inside',
        obj: {
            first: '$',
            second: '$&',
            third: '$`',
            fourth: '$\'',
            fifth: '$1'
        },
        expect: 'this has $, $&, $`, $\' and $1 inside'
        // credit to asmblah https://github.com/asmblah/template-string/blob/master/test/templateTest.js
    }
}

for(var key in tests) {
    str = tests[key].str;
    obj = tests[key].obj;
    expect = tests[key].expect;
    if(templateparser(str, obj) !== expect) {
        console.log("expected: " + expect);
        console.log("got: " + templateparser(str, obj));
        throw new Error(["test", key, "failed"].join(" "));
    }
}

console.log("tests pass");