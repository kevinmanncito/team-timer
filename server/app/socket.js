module.exports = function(io) {

  io.sockets.on('connection', function (socket) {
    console.log("Someone has created a connection!");

    socket.on('change', function (data) {
      // Recieved a change, only sending it out to the correct timers
      socket.broadcast.emit('update'+data._id, data);
    });

  });
}
