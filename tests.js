var templateparser = require('./templatestring.js');

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
    }
}


for(var key in tests) {
    str = tests[key].str;
    obj = tests[key].obj;
    expect = tests[key].expect
    if(templateparser(str, obj) !== expect) {
        throw new Error(["test", key, "failed"].join(" "))
    }
}

console.log("tests pass")