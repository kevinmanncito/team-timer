var path    = require('path'),
    Moment  = require('moment'),
    User    = require('../models/User'),
    _       = require('underscore'),
    express = require('express'),
    router  = express.Router();

router.get('/rest/users', function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

router.get('/rest/users/:id', function(req, res) {
  User.find({'_id': req.params.id}, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

router.post('/rest/users', function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password
  }, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

router.post('/rest/users/:id', function(req, res) {
  User.findOne({'_id': req.params.id}, function(err, user) {
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

router.delete('/rest/users/:id', function(req, res) {
  User.findOne({'_id': req.params.id}, function(err, user) {
    if (err) {
      res.send(err);
    }
    user.remove();
    res.json(user);
  })
});

module.exports = router;
