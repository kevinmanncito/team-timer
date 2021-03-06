var mongoose = require('mongoose'),
    path     = require('path'),
    database = require('../config/database'),
    Schema   = mongoose.Schema;

var timerSchema = new Schema({
  name: String,
  description: String,
  currentTime: Number,
  baseTime: 'Moment',
  status: String,
  url: String,
  created: 'Moment',
  expiration: 'Moment',
  type: String,
  ownerId: Number
});

timerSchema.plugin(database.autoIncrement.plugin, 'Timer');

module.exports = database.connection.model('Timer', timerSchema);
