var mongoose = require('mongoose'),
    path     = require('path'),
    database = require('../../config/database'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  username : String,
  password : String,
  timers : Array
});

userSchema.plugin(database.autoIncrement.plugin, 'User');

module.exports = database.connection.model('User', userSchema);
