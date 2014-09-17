var jwt     = require('jwt-simple'),
    app     = require('../../server.js');

var isAuthenticated = function(req, res, next) {
  console.log("middleware!!!");
  next(); 
};

module.exports = isAuthenticated;

