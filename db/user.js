// # Mongoose User Model & Schema
var mongoose = require('mongoose');
var db = require('./config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = new mongoose.Schema ({
  id: String,
  email: String,
  password: String,
  boards: Array
});

userSchema.pre('save', function ( next ) {
  console.log('in the presave hook');
  this.hashPassword().then(function(){
    next();
  });
}, this);


userSchema.methods.hashPassword = function () {
  console.log('in the hashPassword function');
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      console.log('hash is ' + hash);
      this.password = hash;
      console.log('this is ' + this);
    });
};

userSchema.methods.comparePassword = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    console.log('attemptedPassword is ' + attemptedPassword);
    console.log('this.password is ' + this.password);
    callback(isMatch);
  });
};

var User = mongoose.model('user', userSchema);

module.exports = User;


