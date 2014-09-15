var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    io            = require('socket.io').listen(server),
    path          = require('path'),
    bodyParser    = require('body-parser'),
    morgan        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session');

// all environments
app.set('port', process.env.PORT || 3000);
app.use('/static', express.static(path.resolve('../client/build')));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

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
// Express 3 way of routes
// require('./app/routes')(app);

// Express 4 way of routes
var timerRouter = require('./app/routers/timer');
var userRouter = require('./app/routers/user');
app.use('/', timerRouter);
app.use('/', userRouter);

// Serve up the index.html file for our angular app
app.get('/', function(req, res) {
  res.sendFile(path.resolve('../client/build/index.html'));
});

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

// Not sure what this is for...
// exports = module.exports = app;
