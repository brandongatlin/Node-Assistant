var twitterKeys = require('./keys.js');
var request = require("request");
var twitter = require("twitter");
var T = new twitter(twitterKeys)
console.log(twitterKeys);

var params = {
  q: 'brandon8118',
  count: 20
};

var inputs = process.argv[2];


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
}

function tweet() {
  T.get('search/tweets', params, gotData);

  function gotData(err, data, response) {
    console.log(data);
  }
}


// {
//   var queryUrl = "https://api.twitter.com/1.1/search/tweets.json?q=from:brandon8118&count=20";
//
//   console.log(queryUrl);
//
//   request(queryUrl, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       console.log(response);
//
//     } else {
//       console.log(response);
//     } //end console log response
//
//   }); //end if statement
//
// } //end function tweet

function spotify() {

}

function movie() {

}

function doIt() {

}

//testing
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
//
//
// // This line is just to help us debug against the actual URL.
// console.log(queryUrl); //works
//
//
// // Then create a request to the queryUrl
// request(queryUrl, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     console.log(response);
//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
//
// });
