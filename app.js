var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var app = express();


app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(cookieSession({
  name: 'session',
  secret: 'ramdev'
}));


app.set('view engine', 'jade');

require('./routes.js')(app);


var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});