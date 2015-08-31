var Hapi = require('hapi');

var users = [];

var createUser = function (request, reply) {

    var userId = users.length;
    users.push(request.payload);

    var userUri = request.server.lookup('retrieveUser').path.replace('{id}', userId);
    reply().created(userUri);
};

var retrieveUser = function (request, reply) {

    reply(users[request.params.id]);
};


var server = new Hapi.Server();
server.connection({ port: 8080 });
server.route({ method: 'POST', path: '/user', handler: createUser });
server.route({ method: 'GET', path: '/user/{id}', config: {
    handler: retrieveUser,
    id: 'retrieveUser'
} });

server.start(function () {

    console.log('server started on port: ' + server.info.port);
});
