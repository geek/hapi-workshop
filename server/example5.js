var Hapi = require('hapi');

var options = {
    debug: {
        log: ['error'],
        request: ['received', 'response']
    }
};

var server = new Hapi.Server(options);
server.connection({ port: 8080 });
server.connection({ port: 8081, labels: [ 'admin' ] });

server.start(function (err) {

    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.dir('server started on port: ' + server.info.port);
    console.dir('server started on port: ' + server.select('admin').info.port);
});
