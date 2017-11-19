//global variables
var inputs = process.argv[2];

//twitter variables
var twitterKeys = require('./keys.js');
var twitter = require("twitter");
var request = require("request");
var T = new twitter(twitterKeys);


//switch statment
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

//twitter query parameters
var params = {
  q: 'brandon8118',
  count: 20
}; //end twitter query parameters

//tweet function
function tweet() {
  T.get('search/tweets', params, gotData);

  function gotData(err, data, response) {
    console.log(data);
  } //end gotData function
} //end tweet function


function spotify() {

}

function movie() {

}

function doIt() {

}

//testing
