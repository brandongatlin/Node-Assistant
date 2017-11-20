//global variables
var inputs = process.argv[2];

//twitter variables
var twitterKeys = require('./keys.js');
var twitter = require("twitter");
var request = require("request");
var T = new twitter(twitterKeys);

//twitter query parameters
var params = {
  q: 'brandon8118',
  count: 20
}; // end twitter query parameters

//spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "40c3cde496f34b0e87930b1c5c8193f2",
  secret: "5afa55708fdd444d87527096b5547746"
});

//omdb variables
var omdb = require('omdb');

//begin switch statement
switch (inputs) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    var song = process.argv[3];
    qSpotify();
    break;

  case "movie-this":
    var flick = process.argv[3];
    movie();
    break;

  case "do-what-it-says":
    var mandate = process.argv[3];
    doIt();
    break;
} //end switch statement

//begin tweet function
function tweet() {
  T.get('search/tweets', params, gotData);

  function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    } //end for loop
  } //end gotData function
} //end tweet function

//start spotify function
function qSpotify() {
  spotify
    .search({
      type: 'track',
      query: song
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    }); //end err function
} //end spotify function

function movie() {
  var queryUrl = "http://www.omdbapi.com/?t=" + flick + "&y=&plot=short&apikey=40e9cece";

  if (flick === "") {
    flick = "mr+nobody";
  } else {
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(response);
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country of Production: " + JSON.parse(body).Country);
        console.log("Language(s): " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

      } //end of console logs

    });
  } //end of else statement


} //end movie function


function doIt() {

}
