## overview
- rejoice
- glue
- confidence
- upstart/systemd

## rejoice
- cli utility for starting up hapi via a json config file
- replaces bin/hapi
- rejoice -c app.json
- based on composer (<a href="https://github.com/hapijs/glue">glue</a>)
- <a href="https://github.com/hapijs/rejoice">https://github.com/hapijs/rejoice</a>

## rejoice example

```json
{
  "connections": [{
    "port": 8080,
    "labels": ["api", "http" ]
  }],
  "plugins": {
    "good": {
      "opsInterval": 5000,
      "reporters": [{
        "reporter": "good-console",
        "events": { "response": "*", "error": "*", "ops": "*" }
      }]
    }
  }
}
```
## rejoice follow along
```bash
cd deploy
npm install
npm run start-simple
```

## glue
- server composer for hapi
- code vs config style
- takes a json manifest
- more flexibility with entry points
- <a href="https://github.com/hapijs/glue">https://github.com/hapijs/glue</a>

## glue entry points
- compose()
- new Hapi.Server()
- preConnections()
- server.connection()
- prePlugins()
- server.register()
- callback()

## glue example

```javascript
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
```
## glue follow along
```bash
cd deploy
npm install
npm run start-glue
```

## confidence
- configuration document format
- foundation for A/B (not covered)
- useful when combined with rejoice

## confidence example
```json
{
    "connections": [
        {
            "port": 8080,
            "labels": [ "api", "http" ]
        }
    ],
    "plugins": {
        "$filter": "env",
        "$base": {
            "good": {
                "opsInterval": 5000,
                "requestHeaders": true
            }
        },
        "$default": {
            "good": {
                "reporters": [
                {
                    "reporter": "good-file",
                    "events": { "error": "*" },
                    "config": "./log/error.log"
                }]
            }
        },
        "dev": {
            "good": {
                "requestPayload": true,
                "responsePayload": true,
                "reporters": [
                {
                    "reporter": "good-console",
                    "events": { "response": "*", "error": "*", "ops": "*" }
                },
                {
                    "reporter": "good-file",
                    "events": { "response": "*" },
                    "config": "./log/response.log"
                },
                {
                    "reporter": "good-file",
                    "events": { "ops": "*" },
                    "config": "./log/ops.log"
                },
                {
                    "reporter": "good-file",
                    "events": { "wreck": "*" },
                    "config": "./log/wreck.log"
                },
                {
                    "reporter": "good-file",
                    "events": { "error": "*" },
                    "config": "./log/error.log"
                }]
            }
        },
        "prod": {
            "good": {
                "reporters": [
                {
                    "reporter": "good-file",
                    "events": { "response": "*" },
                    "config": "./log/response.log"
                },
                {
                    "reporter": "good-file",
                    "events": { "ops": "*" },
                    "config": "./log/ops.log"
                },
                {
                    "reporter": "good-file",
                    "events": { "error": "*" },
                    "config": "./log/error.log"
                }]
            }
        }
    }
}
```

## confidence follow along

```bash
cd deploy
npm install
npm run gen-dev-cfg
npm run start-app
npm run gen-prod-cfg
npm run start-app
```

## systemd
- toss in /etc/systemd/system
- sudo systemctl start/stop app
```bash
[Unit]
Description=app
After=syslog.target

[Service]
WorkingDirectory=/app/myapp
ExecStart=/path/to/node /path/to/rejoice -c /path/to/config
Restart=Always
User=appuser

[Install]
WantedBy=multi-user.target
```

## upstart
- toss in /etc/init
- sudo stop/start app
```bash
start on runlevel [2345]
stop on runlevel [016]

respawn

script
  exec sudo -E -u username bash -c "/path/to/node /path/to/rejoice -c /path/to/hapi.cfg -p /path/to/modules >> /path/to/logfile 2&>1"
end script
```

## Conclusion
You can see how to utilize confidence and rejoice together to deploy your environment specific application.
