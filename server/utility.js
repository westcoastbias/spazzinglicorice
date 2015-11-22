var request = require('request');

var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect('/signin');
  } else {
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      console.log('newUser is ' + newUser);
      req.session.user = newUser;
      console.log('in utilities, redirecting to boards');
      res.status(301).redirect('/boards');
    });
};