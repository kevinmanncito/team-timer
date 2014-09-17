var path    = require('path'),
    express = require('express'),
    Moment  = require('moment'),
    app     = require('../../server.js'),
    User    = require('../models/User'),
    jwt     = require('jwt-simple'),
    router  = express.Router();

router.post('/rest/tokens', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.send(401);
  }
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.send(401);
    }
    if (!user) {
      res.send(401);
    }
    if (!user.verifyPassword(req.body.password)) {
      res.send(401);
    }
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
  });
});

module.exports = router;
