var users = [];


exports.register = function (server, options, next) {

    decorate(server);
    next();
};


exports.register.attributes = {
    name: 'user',
    version: '0.0.1'
};


var decorate = function (server) {

    server.decorate('request', 'createUser', function (user) {

        var userId = users.length;
        users.push(user);

        return userId;
    });

    server.decorate('request', 'retrieveUser', function (id) {

        return users[id];
    });

    server.decorate('reply', 'userCreated', function (userId) {

        var userUri = this.request.server.lookup('retrieveUser').path.replace('{id}', userId);
        this().created(userUri);
    });
};
