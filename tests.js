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