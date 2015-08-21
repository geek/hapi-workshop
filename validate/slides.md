## joi overview 
- object schema description language
- validator for javascript objects
- joi used useful in non-hapi projects
- built-in helpers for hapi
- response validation
- <a href="https://github.com/hapijs/joi">https://github.com/hapijs/joi</a>

## validation process
- 2 step process
- define schema
- then validate the schema

## define schema
```javascript
var Joi = require('joi');
var schema = {
    a: Joi.string()
};
```
## validate schema
```javascript
// err === null -> valid
var err = Joi.validate({ a: 'a string' }, schema);
```

## notes on validating
- keys are optional by default
- strings are utf-8 encoded by default
- rules are defined in an additive fashion
- rules are evaluated in order after whitelist and blacklist checks

## joi example
```javascript
var Joi = require('joi');

var schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    accessToken: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email()
}).with('username', 'birthyear').without('password', 'accessToken');

var thing = { username: 'abc', birthyear: 1994 };
// err === null -> valid
Joi.validate(thing, schema, function (err, value) {

    if (!err) {
        console.log(JSON.stringify(value) + ' validated');
    }
});
```

## simple joi follow along
```bash
cd validate
npm install
npm run simple
```

## hapi validation (input) example
```javascript
var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
    method: 'GET',
    path: '/hello',
    config: {
        handler: function (request, reply) {

            var message = '';
            if (request.query.id) {
                message = 'your id is ' + request.query.id;
            }
            if (request.query.username) {
                message = 'your username is ' + request.query.username;
            }
            return reply('hello ' + message);
        },
        validate: {
            query: Joi.object({
                id: Joi.number().min(5),
                username: Joi.string().alphanum().min(3).max(10)
            }).xor('id','username').required()
        }
    }
});

server.start(function () {

    console.log(server.info.uri + '/hello?id=4');
    console.log(server.info.uri + '/hello?id=5');
    console.log(server.info.uri + '/hello?username=5');
    console.log(server.info.uri + '/hello?username=ll');
    console.log(server.info.uri + '/hello?username=lloyd');
    console.log(server.info.uri + '/hello?username=lloyd&id=12345');
});
```

## hapi validation follow along
```bash
cd validate
npm install
npm run hapi-validate
```

## hapi response validation
```javascript
var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
    method: 'GET',
    path: '/hello/{name}',
    config: {
        handler: function (request, reply) {

            return reply({ success: true });
        },
        validate: {
            // params, query, payload, headers
            params: {
                name: Joi.string().required()
            }
        },
        response: {
            // set percent rate
            sample: 0,
            schema: Joi.object().keys({
                success: Joi.boolean().required()
            })
        }
    }
});

server.start(function () {

    console.log(server.info.uri + '/hello/lloyd');
});
```
## hapi response validation follow along
```bash
cd validate
npm install
npm run hapi-response
```

## joi schema function by types
- any()
- array()
- boolean()
- date()
- func()
- number()
- object(schema)
- string()

## joi helpful tips
```javascript
// empty string
any.allow('')
// conditional
any.when('key',
  { is: 'val',
    then: Joi.required(),
    otherwise: Joi.allow('').optional()
  }
)
```

## conclusion
Joi is an extremely powerful and useful library that integrates with hapi, but can also be used on other projects.  It is useful for not only validating your inputs params, query, headers, and payload but also your responses.
