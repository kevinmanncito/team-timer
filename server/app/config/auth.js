var jwt     = require('jwt-simple'),
    _       = require('underscore'),
    app     = require('../../server.js');

var authMiddleware = {};

authMiddleware.isAuthenticated = function(req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
  }
  catch(err) {
    res.status(403).send("Forbidden");
  }
  if (!_.isUndefined(token)) {
    try {
      var decoded_token = jwt.decode(token, app.get('jwtTokenSecret'));
    }
    catch(err) {
      res.status(403).send("Forbidden");
    }
  }
  if (!_.isUndefined(decoded_token) && 
      !_.isUndefined(decoded_token.exp) && 
      !_.isUndefined(decoded_token.user)) {
    if (decoded_token.exp <= Date.now()) {
      res.status(400).send("Token has expired");
    } 
    else {
      req.user = decoded_token.user;
      next(); 
    }
  }
};

authMiddleware.hasAccount = function(req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
  }
  catch(err) {
    req.user = 0; // 0 means a public account
    next();
  }
  if (!_.isUndefined(token)) {
    try {
      var decoded_token = jwt.decode(token, app.get('jwtTokenSecret'));
    }
    catch(err) {
      req.user = 0; 
      next();
    }
  }
  if (!_.isUndefined(decoded_token) && 
      !_.isUndefined(decoded_token.exp) && 
      !_.isUndefined(decoded_token.user)) {
    if (decoded_token.exp <= Date.now()) {
      req.user = 0; 
      next();
    } 
    else {
      req.user = decoded_token.user;
      next(); 
    }
  }
}

module.exports = authMiddleware;
