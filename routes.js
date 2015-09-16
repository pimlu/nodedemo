var express = require('express');


function genNum(session) {
   session.number = Math.random()*100+1 | 0;
}

module.exports = function(app) {

  app.use(express.static('public'));
  
  app.get('/', function(req, res) {
    res.render('game', {
      tries: req.session.tries
    });
  });
  
  app.post('/', function(req, res) {
    
    req.session.tries = (req.session.tries || 0) + 1;
    if(!req.session.number) {
      genNum(req.session);
    }
    
    var tries = req.session.tries;
    var guess = +req.body.guess;
    var actual = req.session.number;
    
    
    if(guess === actual) {
      req.session.tries = 0;
      genNum(req.session);
    }
    
    res.render('game', {
      post: true,
      tries: tries,
      guess: guess,
      actual: actual
    });
    
  });
  
};