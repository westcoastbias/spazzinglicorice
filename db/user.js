// # Mongoose User Model & Schema


var mongoose = require('mongoose');
var db = require('./config.js');

var userSchema = new mongoose.Schema ({
  id: String,
  email: String,
  password: String,
  boards: Array
});

var User = mongoose.Model('user', userSchema);

module.exports.userModel = User;

