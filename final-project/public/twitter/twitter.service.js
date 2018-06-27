/*
 * Twitter API Service
 * login()
 * tweetText()
 * tweetMedia()
 * follow()
 */
function TwitterService() {
	this.login = login;
	this.tweetText = tweetText;
	this.tweetMedia = tweetMedia;
	this.follow = follow;
	this.getRequestToken = getRequestToken;
	this.getAccessToken = getAccessToken;
	this.verifyCredentials = verifyCredentials;
	this.init = init;


	var twitterAPI;
	var twitter;
	var userRequestToken;
	var userRequestTokenSecret;
	var userAccessToken;
	var userAccessTokenSecret;

	$(init);

	/*
	 * Initialize API
	 */
	function init() {
		twitterAPI = require('../../node-twitter-api');
		var twitter = new twitterAPI({
    	consumerKey: 'GM07MlAidvgOM18vG4gqSk6vg',
    	consumerSecret: 'IsLU8JDNW4npTea4GXjukuM2881BU7Rp4MkEuBzzOSy0jnTj1u',
    	callback: ''
		});
		getRequestToken();
	}

	/*
	 * Retrieve request token and store it
	 */
	function getRequestToken() {
		twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
		    if (error) {
		        console.log("Error getting OAuth request token : " + error);
		    } else {
		        userRequestToken = requestToken
		        userRequestTokenSecret = requestTokenSecret
		    }
		});
	}

	/*
	 * Retrieve an access token and store it
	 */
	function getAccessToken(requestToken, requestTokenSecret, oauth_verifier) {
		twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier,
			function(error, accessToken, accessTokenSecret, results) {
		    if (error) {
		        console.log(error)
		    } else {
		        //store accessToken and accessTokenSecret somewhere (associated to the user)

		        //Step 4: Verify Credentials belongs here
		    }
		});
	}

	/*
	 * Verify credentials
	 */
	function verifyCredentials(accessToken, accessTokenSecret, params) {
		twitter.verifyCredentials(accessToken, accessTokenSecret, params,
			function(error, data, response) {
		    if (error) {
		        //something was wrong with either accessToken or accessTokenSecret
		        //start over with Step 1
		    } else {
		        //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
		        //data contains the user-data described in the official Twitter-API-docs
		        //you could e.g. display his screen_name
		        console.log(data["screen_name"]);
		    }
		});
	}

	/*
	 * Promot a user to login
	 */
	function login() {
		// implement
	}

	/*
	 * Compose a new tweet if logged in
	 */
	function tweetText(tweetText) {
		twitter.statuses("update", {
	        status: tweetText
			},
		    userAccessToken,
		    userAccessTokenSecret,
		    function(error, data, response) {
		        if (error) {
		            // something went wrong
		        } else {
		            // data contains the data sent by twitter
		            console.log(data);
		        }
		    }
		);
	}

	/*
	 * Compose a new tweet if logged in
	 */
	function tweetMedia(tweetText, media) {
		// implement
	}
	/*
	 * Follow a user if logged in
	 */
	function follow(username) {
		// implement
	}
};
