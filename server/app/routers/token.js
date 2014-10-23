var path    = require('path'),
    express = require('express'),
    Moment  = require('moment'),
    _       = require('underscore'),
    app     = require('../../server.js'),
    User    = require('../models/User'),
    jwt     = require('jwt-simple'),
    router  = express.Router();

router.post('/tokens', function(req, res) {
  if (_.isUndefined(req.body.email) || _.isUndefined(req.body.password)) {
    res.status(401).end('An email and a password are required create a token');
  }
  else {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) {
        res.status(401).end('Error getting user');
      }
      else if (!user) {
        res.status(401).end('User not found: ' + req.body.email);
      }
      else if (!user.verifyPassword(req.body.password)) {
        res.status(401).end('Incorrect password for: ' + req.body.email);
      }
      else {
        var expires = Moment().add(7, 'days').valueOf();
        var token = jwt.encode({
          user: user.id,
          exp: expires
        }, app.get('jwtTokenSecret'));
        res.json({
          token: token,
          expires: expires,
          user: user.toJSON()
        });
      }
    });
  }
});

module.exports = router;
