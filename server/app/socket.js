var jwt = require('jwt-simple'),
    _   = require('underscore'),
    app = require('../server.js');

module.exports = function(io) {

  io.sockets.on('connection', function (socket) {
    socket.on('change', function (data) {
      // Recieved a change, only sending it out to the correct timers
      // and only sending out IF authenticated for timers that are not
      // public.
      if (data.ownerId === 0) {
        socket.broadcast.emit('update'+data._id, data);
      }
      else {
        // We need to see if the token is authentic otherwise we are not changing
        // this timer at all.
        if (data.token) {
          var decoded_token = jwt.decode(data.token, app.get('jwtTokenSecret'));
          if (!_.isUndefined(decoded_token) && 
              !_.isUndefined(decoded_token.exp) && 
              !_.isUndefined(decoded_token.user)) {
            if (decoded_token.exp >= Date.now()) {
              if (parseInt(decoded_token.user) === parseInt(data.ownerId)) {
                socket.broadcast.emit('update'+data._id, data);
              }
            }
          }
        }
      }
    });

  });
}
