var Code = require('code');
var Hapi = require('hapi');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

var internals = {};

internals.prepareServer = function (callback) {

    var server = new Hapi.Server();
    server.connection();
    server.register({
        register: require('..'),
        options: internals.defaults
    }, function (err) {

        expect(err).to.not.exist();
        callback(server);
    });
};

describe('complex', function () {

    it('POST /hello', function (done) {

        internals.prepareServer(function (server) {

            var options = {
                method: 'POST',
                url: '/hello',
                payload: {
                    name: 'name',
                    description: 'description'
                }
            };
            server.inject(options, function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.exist();
                expect(response.result.name).to.equal('name');
                expect(response.result.description).to.equal('description');
                expect(response.result.success).to.be.true();
                done();
            });
        });
    });
});
