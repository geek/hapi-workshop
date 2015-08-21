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

