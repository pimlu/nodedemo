var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var app = express();

//these app.use calls add middleware- functions that treat/modify requests as they go down routes

//use this to read POST request bodies for us (so we can read forms)
app.use(bodyParser.urlencoded({
  extended: true
})); 
//use this so we can store the secret number and how many tries it took them
app.use(cookieSession({
  name: 'session',
  secret: 'ramdev'
}));
//this makes it so res.render uses jade
app.set('view engine', 'jade');

//pass our app to the routes.js file so it can add our game page to the route
require('./routes.js')(app);

//listen on port 8080 for incoming requests
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});