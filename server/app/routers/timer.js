var path    = require('path'),
    Moment  = require('moment'),
    Timer   = require('../models/Timer'),
    _       = require('underscore'),
    express = require('express'),
    router  = express.Router();

router.get('/rest/timers', function(req, res) {
  Timer.find(function(err, timers) {
    if (err) {
      res.send(err);
    }
    res.json(timers);
  });
});

router.get('/rest/timers/:id', function(req, res) {
  Timer.find({'_id': req.params.id}, function(err, timer) {
    if (err) {
      res.send(err);
    }
    res.json(timer);
  });
});

router.post('/rest/timers', function(req, res) {
  Timer.create({
    name: req.body.name,
    description: req.body.description,
    currentTime: req.body.currentTime,
    baseTime: req.body.baseTime,
    status: req.body.status,
    created: new Moment(),
    type: req.body.type,
    expiration: new Moment().add(2, 'days')
  }, function(err, timer) {
    if (err) {
      res.send(err);
    }
    res.send(timer);
  });
});

router.post('/rest/timers/:id', function(req, res) {
  Timer.findOne({'_id': req.params.id}, function(err, timer) {
    if (err) {
      res.send(err);
    }
    timer.name = req.body.name;
    timer.status = req.body.status;
    timer.type = req.body.type;
    timer.title = req.body.title;
    timer.description = req.body.description;
    timer.created = timer.created;
    timer.expiration = timer.expiration;
    timer.currentTime = req.body.currentTime;
    timer.baseTime = req.body.baseTime;
    timer.save();
    res.json(timer);
  });
});

router.delete('/rest/timers/:id', function(req, res) {
  Timer.findOne({'_id': req.params.id}, function(err, timer) {
    if (err) {
      res.send(err);
    }
    timer.remove();
    res.json(timer);
  })
});

module.exports = router;
