var Hapi = require('hapi');
var Route = require('./route-plugin');
var User = require('./user-plugin');


var server = new Hapi.Server();
server.connection({ port: 8080 });

server.register([User, Route], function (err) {

    server.start(function () {

        console.log('server started on port: ' + server.info.port);
    });
});
