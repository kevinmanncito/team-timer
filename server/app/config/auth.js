var jwt     = require('jwt-simple'),
    _       = require('underscore'),
    app     = require('../../server.js');

var isAuthenticated = function(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  try {
    var decoded_token = jwt.decode(token, app.get('jwtTokenSecret'));
  }
  catch(err) {
    res.status(400).send("Illegal token");
  }
  if (!_.isUndefined(decoded_token) && 
      !_.isUndefined(decoded_token.exp) && 
      !_.isUndefined(decoded_token.user)) {
    if (decoded_token.exp <= Date.now()) {
      res.status(400).send("Token has expired");
    }
    next(); 
  }
};

module.exports = isAuthenticated;

