var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
  method: 'GET',
  path: '/hello/{name}',
  config: {
    handler: function (request, reply) {

        return reply({ success: true });
    },
    validate: {
      // params, query, payload, headers
      params: {
          name: Joi.string().required()
      }
    },
    response: {
        // set percent rate
        sample: 0,
        schema: Joi.object().keys({
            success: Joi.boolean().required()
        })
    }
  }
});

server.start(function () {

    console.log(server.info.uri + '/hello/lloyd');
});

