var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8080, notvalid: true });

server.start(function (err) {

    console.error(err);
});
