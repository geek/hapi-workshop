## overview
- good is a process monitor that listens for event(s)
- maps to hapi <a href="https://github.com/hapijs/hapi/blob/master/API.md#server-events">events</a>
- loggers
- good-broadcast
- <a href="https://github.com/hapijs/good">https://github.com/hapijs/good</a>

## good loggers
- good-console
- good-file
- good-http
- community and hapijs reporters

## good event types
- response
- request (request.log)
- ops
- log (server.log)
- error
- wreck

## good output types
console - ops
```bash
141225/093015.900, [ops, event.tags], memory: 10Mb, uptime (seconds): 1000, load: [ 1.650390625, 1.6162109375, 1.65234375 ]
```
console - error
```bash
141225/093015.900, [error, event.tags], message: there was an error, stack: eventData.stack
```
console - request
```bash
141225/093015.900, [request, event.tags], data: {"message":"you made a request to a resource"}
```
console - log
```bash
141225/093015.900, [log, event.tags], data: you logged a message
```
console - response
```bash
141223/164207.694, [response], localhost: post /data {"name":"adam"} 200 (150ms) response payload: {"foo":"bar","value":1}</li>
```

## additional good options
- opsInterval (default 15s)
- requestHeaders
- responsePayload
- requestPayload
- increases size and may impact security

## good-console reporter

```javascript
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
    "reporters": [{
        "reporter": "good-console",
        "events": { "response": "*", "error": "*", "ops": "*" }
    }]
};

server.register({register: require('good'), options: goodOptions }, function(err) {

   if (err) {
       console.log('There was an err: ' + err);
   }
   server.start(function () {

       console.log('Server running at:', server.info.uri);
   });
});
```

## good-console follow along
```bash
cd monitor
npm install
npm run start-good-console
```

## good-file reporter
```javascript
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
```
## good-file follow along
```bash
cd monitor
npm install
npm run start-good-file
```

## good-http reporter
```javascript
var options = {
  reporters: [{
    reporter: require('good-http'),
    events: { error: '*' },
    endpoint: 'http://prod.logs:3000',
    // events to hold before transmission
    threshold: 20,
    wreck: {
        headers: { 'x-api-key' : 12345 }
    }
  }]
};

server.register(require('good-http'), options, function (err) {
  if (!err) {
    // Plugin loaded successfully
  }
});
```

## good-broadcast utility
- cli utility
- separates it out from your other process
- adds envelope to your files and sends to url

```javascript
var envelope = {
    schema: internals.schemaName,
    host: internals.host,
    appVer: internals.appVer,
    timestamp: Date.now(),
    events: log
};
```

## good-broadcast example

```javascript
{
    "url": "http://server/analytics",
    "log": "/log/response.log",
    "interval": 1000,
    "newOnly": true,
    "resumePath": "/log/responseIndex.tmp",
    "wait": 1000,
    "attempts": 1
}
```
```bash
broadcast -c broadcast.json
```

## Conclusion

You can get some great statistics about your system and with a proper aggregate log tool like splunk, logstash, etc you can easily see what your app is doing.  This plugin gives you many 'good' statistics for free.
