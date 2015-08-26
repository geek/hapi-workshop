var Hapi = require('hapi');

var options = {
    debug: {
        log: ['error'],
        request: ['received', 'response']
    },
    connections: {
        router: {
            isCaseSensitive: true
        },
        routes: {
            cors: true
        },
        load: {
            maxHeapUsedBytes: 1000000000,
            maxRssBytes: 1000000000,
            maxEventLoopDelay: 10           // in ms
        }
    },
    load: {
        sampleInterval: 1000                // in ms
    }
};

var server = new Hapi.Server(options);
server.connection({ port: 8080 });

server.start(function (err) {

    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.dir('server started on port: ' + server.info.port);
});
