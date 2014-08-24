var express  = require('express'),
    app      = express(),
    server   = require('http').createServer(app),
    io       = require('socket.io').listen(server),
    path     = require('path'),
    mongoose = require('mongoose'),
    database = require('./config/database');

//configurations
mongoose.connect(database.url);

// all environments
app.set('port', process.env.PORT || 3000);
app.use('/static', express.static(path.resolve('../client/build')));

// Production headers
if (app.get('env') === 'production') {
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://kevinrmann.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}

// Develelopment headers
if (app.get('env') === 'development') {
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}

// routes
require('./app/routes')(app);

// socket connections
io.set('transports', ['websocket', 'xhr-polling', 'htmlfile']);
// io.set('log level', 2);
require('./app/socket')(io);

// listen
// ------------------------------------------------------------
server.listen(app.get('port'), function(){
  console.log('Getting jiggy on port: ' + app.get('port'));
});
// ------------------------------------------------------------

exports = module.exports = app;
