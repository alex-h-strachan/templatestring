var templateparser = require('./templatestring.js');
"use strict";

var tests = {
    "one-layer object": {
        str: "hi ${foo}",
        obj: { foo: "bar" },
        expect: "hi bar"
    },
    "two-layer object": {
        str: "hi ${foo.bar}",
        obj: { foo: { bar: "whack" } },
        expect: "hi whack"
    },
    "repeated two-layer object": {
        str: "hi ${foo.bar}, this is ${foo.bar}",
        obj: { foo: { bar: "whack" } },
        expect: "hi whack, this is whack"
    },
    "long string test": {
        str: `
            <%foo.bar%>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus, odio et maximus interdum, nunc nisi lacinia nunc, et ullamcorper nisl ex et nunc. Mauris tristique, nibh vitae molestie imperdiet, augue neque pharetra libero, ac laoreet arcu ante vitae quam. Phasellus vel massa velit. Morbi vel lobortis nibh. Praesent ac eros est. Pellentesque et mattis arcu. Nunc in rhoncus nunc. Duis ullamcorper lacus efficitur dui consectetur, ut rhoncus elit posuere.
            <%foo.bar%>

            <%foo.bar%>
            Donec ornare augue non lacus tincidunt rutrum. Ut pharetra massa id arcu elementum, nec commodo augue porttitor. In hac habitasse platea dictumst. In arcu risus, aliquet nec augue eu, rhoncus suscipit velit. Curabitur at venenatis sem. Quisque lacus tellus, pellentesque ac lacinia non, dictum nec magna. Sed turpis lacus, gravida vel tellus ut, consequat volutpat purus. Vivamus vulputate fringilla arcu, sit amet faucibus quam posuere vel. Integer id leo lobortis, vestibulum arcu at, auctor leo. Ut vitae lobortis arcu. Aliquam vestibulum ullamcorper bibendum.
            <%foo.bar%>

            <%foo.bar%>
            Morbi libero enim, dignissim eu venenatis a, sollicitudin at lorem. Quisque sit amet vehicula nulla. Nullam aliquam tristique rutrum. Aliquam erat volutpat. Curabitur et neque venenatis, pharetra sem quis, congue urna. Etiam ornare posuere lectus, non facilisis augue. Etiam sit amet enim eu massa efficitur porttitor. Nunc at ligula fringilla, ultricies massa convallis, volutpat lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In aliquet iaculis laoreet. Ut felis metus, viverra consectetur leo quis, suscipit aliquam augue. Praesent ultricies nulla sit amet enim malesuada aliquam. Cras aliquet turpis diam, non tempor arcu varius in.
            <%foo.bar%>

            <%foo.bar%>
            Proin tristique erat a ipsum ullamcorper, eu rutrum ante tincidunt. Vivamus non lacus tortor. Aenean in tortor eu purus sagittis cursus ac tempor magna. Nulla facilisi. Nunc vel luctus ipsum, vitae condimentum elit. Aenean suscipit eros gravida, sollicitudin orci porttitor, maximus libero. Pellentesque dapibus ac quam eget faucibus. Vestibulum viverra ornare urna vitae tempus. Duis luctus libero felis, sit amet sagittis leo varius ut. Donec et odio at erat imperdiet fermentum nec sed ante.
            <%foo.bar%>

            <%foo.bar%>
            Suspendisse nec maximus risus, vitae consequat enim. Ut malesuada interdum sapien, ac tristique magna dignissim vitae. Praesent vitae viverra massa, sed laoreet ex. In sollicitudin sollicitudin rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam gravida porttitor eros sed convallis. Mauris sed viverra velit, id varius enim. Nunc consequat vitae sapien sit amet ultrices. Nam mollis justo id mi vehicula, in sollicitudin leo varius. 
            <%foo.bar%>
        `,
        obj: { foo: { bar: "whack" } },
        opt: { start: "<%", end: "%>" },
        expect: `
            whack
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus, odio et maximus interdum, nunc nisi lacinia nunc, et ullamcorper nisl ex et nunc. Mauris tristique, nibh vitae molestie imperdiet, augue neque pharetra libero, ac laoreet arcu ante vitae quam. Phasellus vel massa velit. Morbi vel lobortis nibh. Praesent ac eros est. Pellentesque et mattis arcu. Nunc in rhoncus nunc. Duis ullamcorper lacus efficitur dui consectetur, ut rhoncus elit posuere.
            whack

            whack
            Donec ornare augue non lacus tincidunt rutrum. Ut pharetra massa id arcu elementum, nec commodo augue porttitor. In hac habitasse platea dictumst. In arcu risus, aliquet nec augue eu, rhoncus suscipit velit. Curabitur at venenatis sem. Quisque lacus tellus, pellentesque ac lacinia non, dictum nec magna. Sed turpis lacus, gravida vel tellus ut, consequat volutpat purus. Vivamus vulputate fringilla arcu, sit amet faucibus quam posuere vel. Integer id leo lobortis, vestibulum arcu at, auctor leo. Ut vitae lobortis arcu. Aliquam vestibulum ullamcorper bibendum.
            whack

            whack
            Morbi libero enim, dignissim eu venenatis a, sollicitudin at lorem. Quisque sit amet vehicula nulla. Nullam aliquam tristique rutrum. Aliquam erat volutpat. Curabitur et neque venenatis, pharetra sem quis, congue urna. Etiam ornare posuere lectus, non facilisis augue. Etiam sit amet enim eu massa efficitur porttitor. Nunc at ligula fringilla, ultricies massa convallis, volutpat lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In aliquet iaculis laoreet. Ut felis metus, viverra consectetur leo quis, suscipit aliquam augue. Praesent ultricies nulla sit amet enim malesuada aliquam. Cras aliquet turpis diam, non tempor arcu varius in.
            whack

            whack
            Proin tristique erat a ipsum ullamcorper, eu rutrum ante tincidunt. Vivamus non lacus tortor. Aenean in tortor eu purus sagittis cursus ac tempor magna. Nulla facilisi. Nunc vel luctus ipsum, vitae condimentum elit. Aenean suscipit eros gravida, sollicitudin orci porttitor, maximus libero. Pellentesque dapibus ac quam eget faucibus. Vestibulum viverra ornare urna vitae tempus. Duis luctus libero felis, sit amet sagittis leo varius ut. Donec et odio at erat imperdiet fermentum nec sed ante.
            whack

            whack
            Suspendisse nec maximus risus, vitae consequat enim. Ut malesuada interdum sapien, ac tristique magna dignissim vitae. Praesent vitae viverra massa, sed laoreet ex. In sollicitudin sollicitudin rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam gravida porttitor eros sed convallis. Mauris sed viverra velit, id varius enim. Nunc consequat vitae sapien sit amet ultrices. Nam mollis justo id mi vehicula, in sollicitudin leo varius. 
            whack
        `
    },
    "null string test": {
        str: undefined,
        obj: { foo: "bar" },
        expect: ""
    },
    "null obj test": {
        str: "foo",
        obj: undefined,
        expect: "foo"
    },
    "null property test": {
        str: "${foo}",
        obj: {},
        expect: "undefined"
    },
    "special characters": {
        str: "${a}${1}${!}${$}",
        obj: {
            a: "foo",
            1: "bar",
            "!": "foobar",
            "$": "taco"
        },
        expect: "foobarfoobartaco"
    },
    "bracket indexed properties": {
        str: "${['some property']} or ${[0]}",
        obj: { 'some property': "this", 0: "that" },
        expect: "this or that"
    },    
    "complex indexed properties": {
        str: "${a.['some ']['pro per ty']} or ${b[0]}",
        obj: {
            a: {
                'some ': { 'pro per ty': "this" } },
                b: ["that"]
            },
        expect: "this or that"
    },
    "property names containing [ or .": {
        str: "This is ${.could}. This is also ${[work}.",
        obj: { '.could': 'defined', '[work': 'defined' },
        expect: 'This is undefined. This is also undefined.'
    },
    "handlebar markers": {
        str: "I can use {{template}}",
        obj: { template: "handlebars!" },
        opt: { start: "\\{\\{", end: "\\}\\}" },
        expect: "I can use handlebars!"
    },
    "<% markers": {
        str:"I can use <%template%>", 
        obj:{ template: "<%-style templates!" },
        opt: { start: "<%", end: "%>" },
        expect: "I can use <%-style templates!"
    },
    "/marker ": {
        str:"slack /template  templates", 
        obj:{ template: "style" },
        opt: { start: "/", end: " " },
        expect: "slack style templates"
    },
    "python brackets":{
        str:"I {0} {1} {2} brackets",
        obj: ["can", "use", "python" ],
        opt: {start: "\\{", end: "\\}"},
        expect: "I can use python brackets"
    },
    "dangerous strings": {
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
    },
    "encode strings": {
        str: 'encode ${specialChars}',
        obj: {specialChars: '%$` '},
        opt: {encode: true},
        expect: 'encode %25%24%60%20'
    },
    "encode pg strings": {
        str: 'encode ${specialChars}',
        obj: {specialChars: '%$`\'\' '},
        opt: {encode: 'postgres'},
        expect: 'encode %25%24%60\'\'\'\'%20'
    }
}

for (var key in tests) {
    str = tests[key].str;
    obj = tests[key].obj;
    opt = tests[key].opt
    expect = tests[key].expect;
    if (templateparser(str, obj, opt) !== expect) {
        console.log("expected: " + expect);
        console.log("got: " + templateparser(str, obj));
        throw new Error(["test", key, "failed"].join(" "));
    }
}

console.log("tests pass");

console.log('performance test no caching')
var start = new Date().getTime();
for(var i = 0; i < 10000; i++) {
    for (var key in tests) {
        str = tests[key].str;
        obj = tests[key].obj;
        opt = tests[key].opt
        expect = tests[key].expect;
        if (templateparser(str, obj, opt) !== expect) {
            console.log("expected: " + expect);
            console.log("got: " + templateparser(str, obj));
            throw new Error(["test", key, "failed"].join(" "));
        }
    }
}
var end = new Date().getTime();
console.log(end-start);

templateparser.cache_length(100)

console.log('performance test cached')
var start = new Date().getTime();
for(var i = 0; i < 10000; i++) {
    for (var key in tests) {
        str = tests[key].str;
        obj = tests[key].obj;
        opt = tests[key].opt
        expect = tests[key].expect;
        if (templateparser(str, obj, opt) !== expect) {
            console.log("expected: " + expect);
            console.log("got: " + templateparser(str, obj));
            throw new Error(["test", key, "failed"].join(" "));
        }
    }
}
var end = new Date().getTime();
console.log(end-start);