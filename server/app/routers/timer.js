var path           = require('path'),
    Moment         = require('moment'),
    Timer          = require('../models/Timer'),
    _              = require('underscore'),
    express        = require('express'),
    authMiddleware = require('../config/auth'),
    router         = express.Router();

router.get('/timers/:id', function (req, res) {
  Timer.find({'_id': req.params.id}, function (err, timer) {
    if (err) {
      res.send(err);
    } 
    else {
      res.json(timer);
    }
  });
});

router.use(authMiddleware.hasAccount);

router.post('/timers', function (req, res) {
  Timer.create({
    name: req.body.name,
    description: req.body.description,
    currentTime: req.body.currentTime,
    baseTime: req.body.baseTime,
    status: req.body.status,
    created: new Moment(),
    type: req.body.type,
    expiration: new Moment().add(2, 'days'),
    ownerId: req.user
  }, function (err, timer) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(timer);
    }
  });
});

router.get('/timers', function (req, res) {
  if (parseInt(req.user) === 0) {
    Timer.find({'ownerId': req.user}).limit(20).exec(function (err, timers) {
      if (err) {
        res.send(err);
      } 
      else {
        res.json(timers);
      }
    });
  } else {
    Timer.find({'ownerId': req.user}).exec(function (err, timers) {
      if (err) {
        res.send(err);
      } 
      else {
        res.json(timers);
      }
    });
  }
});


router.put('/timers/:id', function (req, res) {
  Timer.findOne({'_id': req.params.id}, function (err, timer) {
    if (err) {
      res.status(400).send(err);
    } 
    else {
      if (_.isUndefined(timer.ownerId)) {
        timer.ownerId = 0;
      }
      // Don't let the wrong people change the wrong timer
      if (parseInt(req.user) !== parseInt(timer.ownerId) && parseInt(timer.ownerId) !== 0) {
        res.status(403).send("Not allowed");
      }
      else {
        timer.name = req.body.name;
        timer.status = req.body.status;
        timer.type = req.body.type;
        timer.title = req.body.title;
        timer.description = req.body.description;
        timer.created = timer.created;
        timer.expiration = timer.expiration;
        timer.currentTime = req.body.currentTime;
        timer.baseTime = req.body.baseTime;
        timer.ownerId = req.user;
        timer.save();
        res.json(timer);
      }
    }
  });
});

router.delete('/timers/:id', function (req, res) {
  Timer.findOne({'_id': req.params.id}, function (err, timer) {
    if (err) {
      res.send(err);
    } else {
      if (_.isUndefined(timer.ownerId)) {
        timer.ownerId = 0;
      }
      // Don't let the wrong people change the wrong timer
      if (parseInt(req.user) !== parseInt(timer.ownerId) && parseInt(timer.ownerId) !== 0) {
        res.status(401).send("Not allowed");
      } else {
        timer.remove();
        res.json(timer);
      }
    }
  })
});

module.exports = router;
