var users = [];


exports.register = function (server, options, next) {

    server.dependency('user');

    server.route({ method: 'POST', path: '/user', handler: createUser });
    server.route({ method: 'GET', path: '/user/{id}', config: {
        handler: retrieveUser,
        id: 'retrieveUser'
    } });

    next();
};


exports.register.attributes = {
    name: 'route',
    version: '0.0.1'
};


var createUser = function (request, reply) {

    var userId = request.createUser(request.payload);
    reply.userCreated(userId);
};

var retrieveUser = function (request, reply) {

    reply(request.retrieveUser(request.params.id));
};
