var Hapi = require('hapi');


var handler = function (request, reply) {

    reply({ Hello: request.params.hello });
};


var server = new Hapi.Server();
server.connection({ port: 8080 });
server.route({ method: 'GET', path: '/{hello}', handler: handler });

server.start(function () {

    console.log('server started on port: ' + server.info.port);
});
