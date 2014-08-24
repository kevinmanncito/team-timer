module.exports = function(io) {

  io.sockets.on('connection', function(socket) {
    console.log("Someone has joind the game!");

  });
}
