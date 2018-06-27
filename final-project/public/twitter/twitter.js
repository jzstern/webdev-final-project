//IFFE
(function () {
	var loginButton;
	var tweetButton;
	var tweetField;
	var responseField;
	var twitterService;
	$(main);

	// initialize selectors
	function main() {
		twitterService = new TwitterService();
		loginButton = $('#login-button');
		tweetButton = $('#tweet-button');
		tweetField = $('#tweet-field');
		responseField = $('#response-field');
		loginButton.click(login);
		tweetButton.click(tweet);
	}

	// login
	function login() {
		twitterService.login();
	}

	// tweet
	function tweet() {
		var text = tweetField.val();
		tweetField.val('');
		twitterService.tweet(text);
	}
})();;