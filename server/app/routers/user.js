var path            = require('path'),
    Moment          = require('moment'),
    User            = require('../models/User'),
    _               = require('underscore'),
    express         = require('express'),
    jwt             = require('jwt-simple'),
    app             = require('../../server.js'),
    isAuthenticated = require('../config/auth').isAuthenticated,
    router          = express.Router();

router.post('/users', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  if (_.isUndefined(email) || _.isUndefined(password)) {
    res.status(401).end('An email and a password are required to sign up');
  } else {
    User.findOne({email: email}, function (err, user) {
      if (err) {
        res.status(400);
        res.send(err);
      }
      if (user) {
        res.status(400);
        res.send("User with " + email + " already exists");
      }
      else {
        var newUser = User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save(function (err) {
          if (err) {
            res.status(400);
            res.send(err);
          }
          var expires = Moment().add(7, 'days').valueOf();
          var token = jwt.encode({
            user: newUser.id,
            exp: expires
          }, app.get('jwtTokenSecret'));
          newUser.token = token;
          res.status(201);
          res.json({user: newUser, token: token});
        });
      }
    });
  }
});


router.use(isAuthenticated);

router.get('/users/0', function (req, res) {
  User.find({'_id': req.user}, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

router.get('/users', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

router.get('/users/:id', function (req, res) {
  User.find({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});


router.post('/users/:id', function (req, res) {
  User.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.send(err);
    }
    user.username = req.body.username;
    user.password = req.body.password;
    user.timers = req.body.timers;
    user.save();
    res.json(user);
  });
});

router.delete('/users/:id', function (req, res) {
  User.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.send(err);
    }
    user.remove();
    res.json(user);
  })
});

module.exports = router;
