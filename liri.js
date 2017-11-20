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

//spotify
var spotify = new Spotify({
  id: "40c3cde496f34b0e87930b1c5c8193f2",
  secret: "5afa55708fdd444d87527096b5547746"
});

var song = process.argv[3];

//begin switch statement
switch (inputs) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    qSpotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
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

}

function doIt() {

}
