// Need a constructor for the keys and twitter?
var keys = require("./keys.js") 
var twitter = require("twitter");
var omdb = require("request");
var spotify = require("spotify");
var filesystem = require("fs");

var liriCommand = process.argv[2];

var twitterKeys = keys.twitterKeys;

var twitterUser = new twitter({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret
});
console.log(twitterUser);
