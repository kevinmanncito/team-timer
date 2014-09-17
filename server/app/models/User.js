var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    database = require('../config/database'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  timers: Array
});

userSchema.plugin(database.autoIncrement.plugin, 'User');

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = database.connection.model('User', userSchema);
