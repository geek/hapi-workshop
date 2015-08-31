var Hapi = require('hapi');

var users = [];

var createUser = function (request, reply) {

    var userId = request.createUser(request.payload);
    reply.userCreated(userId);
};

var retrieveUser = function (request, reply) {

    reply(users[request.params.id]);
};


var server = new Hapi.Server();

server.decorate('request', 'createUser', function (user) {

    var userId = users.length;
    users.push(user);

    return userId;
});

server.decorate('reply', 'userCreated', function (userId) {

    var userUri = this.request.server.lookup('retrieveUser').path.replace('{id}', userId);
    this().created(userUri);
});


server.connection({ port: 8080 });
server.route({ method: 'POST', path: '/user', handler: createUser });
server.route({ method: 'GET', path: '/user/{id}', config: {
    handler: retrieveUser,
    id: 'retrieveUser'
} });

server.start(function () {

    console.log('server started on port: ' + server.info.port);
});
