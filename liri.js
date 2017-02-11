// Need a constructor for the keys and twitter?
var keys = require("./keys.js") 
var twitter = require("twitter");
var tmdb = require("request");
var spotify = require("spotify");
var fs = require("fs");

var liriCommand = process.argv[2];
var searchTitle = process.argv[3];

var twitterKeys = keys.twitterKeys;
// var movieKey = keys.tmdbKeys;

// var movieAPIKey = new tmdb({
// 	api_key: movieKey.api_key
// });

var twitterUser = new twitter({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret
});
//console.log(twitterUser); okay keys working

//Switch cases to call function based on liriCommand entered.
switch(liriCommand) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	myPlayList();
	break;

	case "movie-this":
	myMovie();
	break;

	case "do-what-it-says":
	randomPick();
	break;
}

//Function for pulling in last 20 tweets

function myTweets(){
	twitterUser.get('search/tweets', {q: 'burgeoningbaker', count: 20}, function(error, tweet, response) {
		if(error){
			console.log(error);
		}else{
			console.log(tweet);
		}
	});
};

//Function for pulling in artist, song name, link to song and album with song via Spotify
function myPlayList(){
	if (!searchTitle){
		searchTitle = 'The Sign';
	}

	spotify.search({type: 'track', query: searchTitle}, function(err, data){
		if (err){
			console.log('Error occurred: ' + err);
			return;
		}
		//Handle Data
		var albumTrack = data.tracks.items;

		for (i=0; i < albumTrack.length; i++){
		console.log("Artist: " + albumTrack[i].artists[0].name);
		console.log("Album Title: " + albumTrack[i].album.name);
		console.log("Spotify Link: " + albumTrack[i].preview_url);
		console.log("Track Title: " + albumTrack[i].name);
		console.log("-------------------")
		// } else if (!data && !err){
		// myPlaylist('The Sign');
		}
	});
	
};

//Function for using request to get OMDB movie information from movie object
// Move Title, Year of release, Rating, Country, Language, Plot, Actors, Rotten Tomato Rating, URL

function myMovie(){};

// Function to fire off if typed do what it says

function randomPick(){
	//Read the file, split on comma, take second part as an argument?

	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error){
			console.log(error);
		} else {
			//console.log(data);
			// liriCommand = dataArray.slice(0, -1)
			// searchTitle = dataArray.slice(1)
			// console.log(liriCommand);
			// console.log(searchTitle);
			var dataArray = data.split(",");
			if (dataArray[0] === 'spotify'){
				myPlaylist(dataArray[1]);
			

		
			// for (i=0; i<dataArray.length; i++){
			// 	Command = dataArray.slice(0);
			// 	searchTitle = dataArray.slice(1);
			// 	liriCommand = Command + searchTitle;

			// 	console.log(liriCommand);
			// }

			
			//console.log(searchTitle);

		 };	
		};
	});
};



