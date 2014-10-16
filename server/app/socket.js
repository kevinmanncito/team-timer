module.exports = function(io) {

  io.sockets.on('connection', function (socket) {
    console.log("Someone has created a connection!");

    socket.on('change', function (data) {
      // Recieved a change, only sending it out to the correct timers
      console.log('change:', data);
      socket.broadcast.emit('update'+data._id, data);
    });

  });
}
