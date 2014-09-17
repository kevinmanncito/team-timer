var express       = require('express'),
    app           = module.exports = express(), // Allow app to be required in other
                                                // modules. for example: 
                                                // var app = require(../../server.js);
    server        = require('http').createServer(app),
    io            = require('socket.io').listen(server),
    path          = require('path'),
    bodyParser    = require('body-parser'),
    morgan        = require('morgan'),
    jwt           = require('jwt-simple'),
    cookieParser  = require('cookie-parser');

// all environments
app.set('port', process.env.PORT || 3000);
app.use('/static', express.static(path.resolve('../client/build')));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.set('jwtTokenSecret', 'supersecrettimerstring120belziwkdllhi241h');

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
    res.setHeader('Access-Control-Allow-Credentials', true);

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
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}

// Express 4 way of routes
var timerRouter = require('./app/routers/timer');
var userRouter = require('./app/routers/user');
var tokenRouter = require('./app/routers/token');
app.use('/', timerRouter);
app.use('/', userRouter);
app.use('/', tokenRouter);

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


