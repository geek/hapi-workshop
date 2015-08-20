var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8080, labels: ["api", "http"] });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply('hapi-workshop');
    }
});

var goodOptions = {
    "opsInterval": 5000,
    "reporters": [
    {
        "reporter": "good-file",
        "events": { "ops": "*" },
        "config": "./log/ops.log"
    },
    {
        "reporter": "good-file",
        "events": { "response": "*" },
        "config": "./log/response.log"
    },
    {
        "reporter": "good-file",
        "events": { "error": "*" },
        "config": "./log/error.log"
    }
    ]
};

server.register({register: require('good'), options: goodOptions }, function(err) {

   if (err) {
       console.log('There was an err: ' + err);
   }
   server.start(function () {

       console.log('Server running at:', server.info.uri);
   });
});
