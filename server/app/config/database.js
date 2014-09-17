var mongoose      = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

require('mongoose-moment')(mongoose);

//configurations
var connection = mongoose.createConnection('mongodb://localhost/timer');
autoIncrement.initialize(connection);

module.exports = {
  autoIncrement: autoIncrement,
  connection: connection
};
