var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser'),
    controller = require('./controller');
    var cors = require('cors');
    // var unirest = require('unirest');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    // app.use(unirest());

    var routes = require('./routes');
    routes(app);

    app.listen(port);
    console.log('RESTful API server started on: ' + port);