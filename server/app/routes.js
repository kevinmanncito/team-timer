var path   = require('path'),
    Moment = require('moment'),
    User   = require('./models/User'),
    Timer  = require('./models/Timer'),
    _      = require('underscore');

module.exports = function(app) {
  // =====================
  // API endpoints - Timer
  // =====================
  app.get('/rest/timers', function(req, res) {
    Timer.find(function(err, timers) {
      if (err) {
        res.send(err);
      }
      res.json(timers);
    });
  });

  app.get('/rest/timers/:id', function(req, res) {
    Timer.find({'_id': req.params.id}, function(err, timer) {
      if (err) {
        res.send(err);
      }
      res.json(timer);
    });
  });

  app.post('/rest/timers', function(req, res) {
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

  app.post('/rest/timers/:id', function(req, res) {
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

  app.delete('/rest/timers/:id', function(req, res) {
    Timer.findOne({'_id': req.params.id}, function(err, timer) {
      if (err) {
        res.send(err);
      }
      timer.remove();
      res.json(timer);
    })
  });

  // =====================
  // API endpoints - User
  // =====================
  app.get('/rest/users', function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  app.get('/rest/users/:id', function(req, res) {
    User.find({'_id': req.params.id}, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

  app.post('/rest/users', function(req, res) {
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

  app.post('/rest/users/:id', function(req, res) {
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

  app.delete('/rest/users/:id', function(req, res) {
    User.findOne({'_id': req.params.id}, function(err, user) {
      if (err) {
        res.send(err);
      }
      user.remove();
      res.json(user);
    })
  });

  // =====================
  // frontend routes
  // =====================
  app.get('/', function(req, res) {
    res.sendFile(path.resolve('../client/build/index.html'));
  });
}
