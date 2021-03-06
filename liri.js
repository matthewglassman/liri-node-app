// Need a constructor for the keys and twitter?
var keys = require("./keys.js") 
var twitter = require("twitter");
var request = require("request");
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
	case 'my-tweets':
	myTweets();
	break;

	case 'spotify-this-song':
	myPlayList();
	break;

	case 'movie-this':
	myMovie();
	break;

	case 'do-what-it-says':
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

function myMovie(){
	var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=50e449b2805d136c1b71f49657405d9f&query=' + searchTitle;

	request(queryURL, function(error, response, body){
		if (!error && response.statusCode === 200){
			var movieResults = JSON.parse(body).results[0];
			var movID = movieResults.id;
			console.log(movID);

			var newQueryURL = 'https://api.themoviedb.org/3/movie/' + movID + '?api_key=50e449b2805d136c1b71f49657405d9f';

			request(newQueryURL, function(error, response, body){
				console.log(JSON.parse(body));
			});
		}

		
	});

};

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
			var dataArray = data.split(',');
			console.log(dataArray);
			if (dataArray[0] === 'spotify-this-song'){
				searchTitle = dataArray[1];
				//console.log(searchTitle);
				myPlayList(dataArray[1]);
			}

		}	
	})		
};		
