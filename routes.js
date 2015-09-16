var express = require('express');


function genNum(session) {
   session.number = Math.random()*100+1 | 0;
}

module.exports = function(app) {
  //serve static files
  app.use(express.static('public'));
  
  //respond to get requests with a summary of the game state
  app.get('/', function(req, res) {
    res.render('game', {
      tries: req.session.tries
    });
  });
  
  //if someone posts, it's because they made a guess with the form
  app.post('/', function(req, res) {
    
    //increment their tries, and give them a secret number to guess for if there isn't one already
    req.session.tries = (req.session.tries || 0) + 1;
    if(!req.session.number) {
      genNum(req.session);
    }
    
    var tries = req.session.tries; //stored in session
    var guess = +req.body.guess; //stored in post body as a string from the textfield
    var actual = req.session.number; //stored in session
    
    //if they got it right, reset tries and generate a new number
    if(guess === actual) {
      req.session.tries = 0;
      genNum(req.session);
    }
    
    //tell jade to respond with a compiled version of the game.jade template with the following parameters
    res.render('game', {
      post: true,
      tries: tries,
      guess: guess,
      actual: actual
    });
    
  });
  
};