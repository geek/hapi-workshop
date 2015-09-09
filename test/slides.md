## lab overview
- lab is a command line test utility
- refactored mocha to handle most simple use cases
- <a href="https://github.com/hapijs/lab">https://github.com/hapijs/lab</a>

## code
- code is an assertion library
- direct rewrite of chai
- you can use chai with lab
- <a href="https://github.com/hapijs/code">https://github.com/hapijs/code</a>

## whats wrong with chai?
- subset of functions (getting rid of browser complexity)
- chai is a mixture of functions and properties (easy to forget method)
- needed all functions (no missed assertions)

## lab example
```javascript
var Lab = require('lab');
var Code = require('code');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

describe('simple', function () {

    it('returns true when 1 + 1 equals 2', function (done) {

        expect(1 + 1).to.equal(2);
        done();
    });
});
```
## lab simple follow along
```bash
cd test
npm install
npm run test-simple
```

## functions
```javascript
Lab.expect(object).to.equal();
Lab.expect(object).to.not.equal();
Lab.expect(object).to.deep.equal();
Lab.expect(object).to.exist();
Lab.expect(object).to.not.exist();
```

## cli
```bash
-r - reporter (default console)
     console,html,junit,lcov,tap,json,clover
-m - individual test timeout in milliseconds (default 2s)
-t - minimum coverage threshold percentage (default 100%)
-g - grep pattern
-v - verbose 
-i - individual tests (e.g. 1-2 or 1,3)
-p - run tests in parallel
-L - built-in hapijs linter
-a - assert library tallies assertions
```

## package.json
```json
"scripts": {
  "test": "lab -a code -r html -L -t 100 -m 10000"
},
```
## linting
- hapijs projects enforce hapijs standards by default
- eslint by default
- can put in your own eslint rules
- tip: lab -d -L (just checks linting rules)

## server.inject()
- uses shot module (<a href="https://github.com/hapijs/shot">https://github.com/hapijs/shot</a>)
- injects itself in http layer without network stack
- no worrying about port conflicts

## plugin example
```javascript
exports.register = function (server, options, next) {

    // routes
    server.route({
        method: 'POST',
        path: '/hello',
        config: {
            handler: function (response, reply) {

                var obj = {
                    name: response.payload.name,
                    description: response.payload.description,
                    success: true
                };
                return reply(obj);
            }
        }
    });

    next();
};

exports.register.attributes = {

    pkg: require('../package.json')
};
```

## prepareServer example for plugin
```javascript
internals.prepareServer = function (callback) {

    var server = new Hapi.Server();
    server.connection();
    server.register({
        register: require('..'),
        options: internals.defaults
    }, function (err) {

        expect(err).to.not.exist();
        callback(server);
    });
};
```

## server.inject() example
```javascript
describe('complex', function () {

    it('POST /hello', function (done) {

        internals.prepareServer(function (server) {

            var options = {
                method: 'POST',
                url: '/hello',
                payload: {
                    name: 'name',
                    description: 'description'
                }
            };
            server.inject(options, function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.exist();
                expect(response.result.name).to.equal('name');
                expect(response.result.description).to.equal('description');
                expect(response.result.success).to.be.true();
                done();
            });
        });
    });
});
```

## lab complex follow along
```bash
cd test
npm install
npm run test-complex
```

## lab full follow along
```bash
cd test
npm install
npm test
```

## multiple reporters
```bash
lab -a code -L -t 100 -m 10000
-r console -o stdout
-r console -o console.log
-r junit -o lab.xml
-r html -o lab.html
```

## conclusion
Testing is a critical piece to writing quality software.  We have shown how to leverage lab to help you with testing, code coverage, and linting.  You can utilize server.inject() to bypass the network stack. Finally, you can use multiple reporters to integrate with your testing/ci frameworks.
