exports.register = function (server, options, next) {

    // routes
    server.route({
        method: 'POST',
        path: '/hello',
        config: {
            handler: function (response, reply) {

                var obj = {
                    name: response.payload.name,
                    description: response.payload.description,
                    success: true
                };
                return reply(obj);
            }
        }
    });

    next();
};

exports.register.attributes = {

    pkg: require('../package.json')
};
