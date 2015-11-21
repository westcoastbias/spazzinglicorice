// # Main Server

// ##### [Back to Table of Contents](./tableofcontents.html)

// ## Dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Board = require('./db/board');
var User = require('./db/user');
var port = process.env.PORT || 8080;
var handleSocket = require('./server/sockets');
var session = require('express-session');
var util = require('./server/utility.js');


app.use(session({
  secret: 'saxaphone wombat',
  resave: false,
  saveUninitialized: true
}));

// ## Routes

// **Static folder for serving application assets**
app.use('/', express.static(__dirname + '/public'));


// **Static folder for serving documentation**
app.use('/documentation', express.static(__dirname + '/docs'));

// **Home Page**
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });

// **Documentation Page**
app.get('/documentation', function(req, res) {
  res.sendFile(__dirname + '/docs/tableofcontents.html');
});

// ** Signin Page **
app.get('/signin', function(req, res) {
  res.sendFile(__dirname + '/public/signin.html');
});

app.post('/signin', function(req, res) {
  // var email = req.body.email;
  // var password = req.body.password;
  var email = 'lruprecht2@yahoo.com';
  var password = 'test';
  // var user = new User({
  //   email: email,
  // });

  User.findOne({email: email})
  .then( function (user) {
    //email isn't in the db, so we create a new one
    if ( !user ) {
      var newUser = new User({
        email: email,
        password: password,
        boards: []
      });
      console.log('newUser is ' + newUser);
      newUser.save()
        .then(function(newUser) {
          console.log('newUser is saved as ' + newUser);
          util.createSession(req, res, newUser);
          res.redirect('/boards');
        });
  //username is in the db, so we check the password and see if we can log the user in      
    } else {
      console.log('found user');
      console.log('user is ' + user );
      user.comparePassword(password, function (match) {
        console.log('match is ' + match);
        if (match) {
          util.createSession(req, res, user);
          // res.redirect('/boards');
        } else {
          console.error('That password is incorrect. Please try again, or login with a different email address.');
        }
      });
    }
  });
});

app.get('/boards', function(req, res) {
  // Needs to be filled in
  console.log('redirecting to boards page');

});

// **Get a new whiteboard**
app.get('/new', function(req, res) {
  // Create a new mongoose board model.
  var board = new Board.boardModel({strokes: []});
  var id = board._id.toString();
  board.save(function(err, board) {
    if (err) { console.error(err); }
    else {
      console.log('board saved!');
    }
  });
  // Redirect to the new board.
  res.redirect('/' + id);
});


// **Wildcard route & board id handler.**
app.get('/*', function(req, res) {
  var id = req.url.slice(1);
  Board.boardModel.findOne({id: id}, function(err, board) {
    // If the board doesn't exist, or the route is invalid,
    // then redirect to the home page.
    console.log('going to board');
    if (err) {
      res.redirect('/');
    } else {
      // Invoke [request handler](../documentation/sockets.html) for a new socket connection
      // with board id as the Socket.io namespace.
      handleSocket(req.url, board, io);
      // Send back whiteboard html template.
      res.sendFile(__dirname + '/public/board.html');
    }
  });
});


// **Start the server.**
http.listen(port, function() {
  console.log('server listening on', port, 'at', new Date());
});
