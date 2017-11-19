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

//begin switch statement
switch (inputs) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    spotify();
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

    }
  } //end gotData function
} //end tweet function




function spotify() {

}

function movie() {

}

function doIt() {

}
