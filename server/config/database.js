var mongoose      = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

//configurations
var connection = mongoose.createConnection('mongodb://localhost/timer');
autoIncrement.initialize(connection);

module.exports = {
  autoIncrement: autoIncrement,
  connection: connection
};
