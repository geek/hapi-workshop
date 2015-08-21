var Joi = require('joi');

var schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    accessToken: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email()
}).with('username', 'birthyear').without('password', 'accessToken');

var thing = { username: 'abc', birthyear: 1994 };
// err === null -> valid
Joi.validate(thing, schema, function (err, value) {

    if (!err) {
        console.log(JSON.stringify(value) + ' validated');
    }
});
