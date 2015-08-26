var Hapi = require('hapi');


var handler = function (request, reply) {

    reply({ Hello: 'World' });
};


var server = new Hapi.Server();
server.connection({ port: 8080 });
server.route({ method: 'GET', path: '/', handler: handler });

server.start(function () {

    console.dir('server started on port: ' + server.info.port);
});
