var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.start(function () {

    console.dir('server started on port: ' + server.info.port);
});
