var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user.js');

 
router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username}), req.body.password, req.body.firstname, 
                            req.body.lastname, req.body.phonenumber, function(err, user) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local-register')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;