module.exports = function (app) {

  var expressJwt = require('express-jwt');
  var passport = require('passport');
  var TwitterTokenStrategy = require('passport-twitter-token');
  var Router = require('router')
  var router = Router()
  var request=require('request')
  var userModel = require('../models/user/user.model.server');
  var userService = require('../services/user.service.server')

  passport.use(new TwitterTokenStrategy({
    consumerKey: 'GM07MlAidvgOM18vG4gqSk6vg',
    consumerSecret: 'IsLU8JDNW4npTea4GXjukuM2881BU7Rp4MkEuBzzOSy0jnTj1u',
    includeEmail: true,
    callbackURL: 'http://localhost:4000'
  },
  function(token, tokenSecret, profile, callback) {
    console.log('callback')
		user = userService.findUserbyId(id);
		user.twitterProvider = {
			id: profile.id,
			token: token,
			tokenSecret: tokenSecret
		}
		userModel.updateUser(id, user)
	}))

  // create token
  var createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    }, 'my-secret',
    {
      expiresIn: 60 * 120
    });
  };

  // generate token
  var generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
  };

  // send token
  var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  };

  //token handling middleware
  var authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    }
  });

app.post('/api/auth/twitter/reverse',
  function(req, res) {
    console.log('/api/auth/twitter/reverse')
    id = req.id;
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
        consumer_key: 'GM07MlAidvgOM18vG4gqSk6vg',
        consumer_secret: 'IsLU8JDNW4npTea4GXjukuM2881BU7Rp4MkEuBzzOSy0jnTj1u'
      }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }
      var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      console.log(JSON.parse(jsonStr));
      res.send(JSON.parse(jsonStr));
    });
  })

app.post('api/auth/twitter',
  function(req, res, next){
    console.log('/api/auth/twitter')
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: 'GM07MlAidvgOM18vG4gqSk6vg',
        consumer_secret: 'IsLU8JDNW4npTea4GXjukuM2881BU7Rp4MkEuBzzOSy0jnTj1u',
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      console.log(body);
      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body['oauth_token'] = parsedBody.oauth_token;
      req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      req.body['user_id'] = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    return next();
  }, generateToken, sendToken);
}
