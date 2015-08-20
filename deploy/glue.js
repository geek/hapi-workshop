var Glue = require('glue');
var Hapi = require('hapi');

var internals = {
    manifest: require('./simple.json')
};

Glue.compose(internals.manifest,
    { relativeTo: __dirname }, function (err, server) {
    if (err) {
        console.log('server.register err:', err);
    }
    server.start(function () {

        console.log('Server running at:', server.info.uri);
    });
});
