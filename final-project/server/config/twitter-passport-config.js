'use strict';

var passport = require('passport'),
  TwitterTokenStrategy = require('passport-twitter-token'),
  User = require('mongoose').model('User');

module.exports = function () {

  passport.use(new TwitterTokenStrategy({
      consumerKey: 'GM07MlAidvgOM18vG4gqSk6vg',
      consumerSecret: 'IsLU8JDNW4npTea4GXjukuM2881BU7Rp4MkEuBzzOSy0jnTj1u',
      includeEmail: true
    },
    function (token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }));

};
