var Hapi = require('hapi');
var User = require('./user-plugin');


var createUser = function (request, reply) {

    var userId = request.createUser(request.payload);
    reply.userCreated(userId);
};

var retrieveUser = function (request, reply) {

    reply(request.retrieveUser(request.params.id));
};


var server = new Hapi.Server();
server.connection({ port: 8080 });
server.route({ method: 'POST', path: '/user', handler: createUser });
server.route({ method: 'GET', path: '/user/{id}', config: {
    handler: retrieveUser,
    id: 'retrieveUser'
} });


server.register(User, function (err) {

    server.start(function () {

        console.log('server started on port: ' + server.info.port);
    });
});
