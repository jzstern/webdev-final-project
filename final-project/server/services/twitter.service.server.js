// adapted from https://github.com/jaredhanson/passport-twitter
module.exports = function(app){
  app.get('/api/twitter', twitter);
  app.get('/api/twitter',
    require('connect-ensure-login').ensureLoggedIn(), profile);
  app.post('/api/twitter/tweet', tweet);
  app.get('/api/twitter/login', login);
  
  var request = require('request'),
  var express = require('express');
  var passport = require('passport');
  var Strategy = require('passport-twitter').Strategy;

  // return logged in profile
  function twitter(req, res) {
    res.send('twitter');
  }

  // return
  function profile(req, res) {
    res.send({ user: req.user });
  }

  // compose a tweet
  function tweet(req, res) {
    var tweet = req.tweet;
    res.send('{tweet: tweet}');
  }

  // authenticate
  function login(req, res) {
    var response = passport.authenticate('twitter')
    res.send(passport.);
  }
  // Configure the Twitter strategy for use by Passport.
  passport.use(new Strategy({
    consumerKey: 'GM07MlAidvgOM18vG4gqSk6vg',
    consumerSecret: 'IsLU8JDNW4npTea4GXjukuM2881BU7Rp4MkEuBzzOSy0jnTj1u',
    callbackURL: 'http://127.0.0.1:4000/login/twitter/return'
  },function(token, tokenSecret, profile, cb) {
    // Should associate with user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport
  // needs to serialize users into and deserialize users out of the session.
  // Right now, the complete Twitter profile is serialized and deserialized.
  // but this should be done in the database using UserId
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
  /*
  // Define routes.
  app.get('/twitter',
  function(req, res) {
    res.render('home', { user: req.user });
  });

  app.get('/twitter/login',
  function(req, res){
    res.render('login');
  });

  app.get('/twitter/login/twitter',
  passport.authenticate('twitter'));

  app.get('/twitter/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/twitter/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
  */
}
