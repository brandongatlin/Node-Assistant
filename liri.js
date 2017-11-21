// require fs
var fs = require("fs");

//global variables
var inputs = process.argv[2];
var argument = process.argv[3]; // this is our second liri argument (song or movie)

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


liri(); // called to run liri once initally


// wraped the switch satments in a function to call again.
function liri() {
  //begin switch statement
  switch (inputs) {
    case "my-tweets":
      tweet();
      break;

    case "spotify-this-song":
      song = argument;
      qSpotify();
      break;

    case "movie-this":
      var flick = argument;
      movie();
      break;

    case "do-what-it-says":
      var mandate = argument;
      doIt();
      break;
  } //end switch statement
} //END liri


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
      query: argument
    })
    .then(function(response) {

      //console.log(response);
      //console.log(JSON.stringify(response.tracks.items[0], null, 4));

      console.log("artist:", response.tracks.items[0].artists[0].name);
      console.log("album:", response.tracks.items[0].album.name);
      console.log("track:", response.tracks.items[0].name);
      console.log("preview url:", response.tracks.items[0].preview_url);
    })
    .catch(function(err) {
      console.log(err);
    }); //end err function
} //end spotify function

function movie() {
  var queryUrl = "http://www.omdbapi.com/?t=" + flick + "&y=&plot=short&apikey=40e9cece";

  // sets default film in no film argument given.
  if (flick === undefined) {
    flick = "mr+nobody";
  }


  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(response);

      console.log(body);
      //console.log(JSON.parse(body).Ratings[0])

      var imdbRating = JSON.parse(body).Ratings[0];
      console.log(imdbRating);

      if (imdbRating == undefined) {
        imdbRating = "Rating Not Availible"
      } else {
        imdbRating = JSON.parse(body).Ratings[0].Value;
      }


      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1]);
      console.log("Country of Production: " + JSON.parse(body).Country);
      console.log("Language(s): " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);

    } //end of console logs
  });


} //end movie function

function doIt() {
  //read from file random.txt
  //output that text into the spotify function?
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    //console.log(data);

    var dataArr = data.split(",");

    inputs = dataArr[0]; // gets input from file
    argument = dataArr[1]; // gets argument from file

    //console.log(inputs, argument);

    liri(); //runs liri

  });

} //end doIt function
