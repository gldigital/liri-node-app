
var Twitter = require('twitter');
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');

var client = new Twitter({
 consumer_key: 're03JM1pbLqQjk8cdJs3iolv3',
 consumer_secret: 'xBzDzl5ZbR3fxJvOwnWR6IBfA1ygCIn9FzQyq3kDFgx8ZAMaIB',
 access_token_key: '917143346610569218-UTshVjspCF2CqifHLCoVTG9uuVGQyJV',
 access_token_secret: 'B3QVQQqeQIz29o40EuOREkhgNMA4XCsCcWEi0D7wbKdWl'
});



var spotify = new Spotify({
 id: "ac5c06cb57ea41539c0ae740184245e1",
 secret: "fe571ef30b1a41f993abf6343cb2e008"
});


inquirer
.prompt([
 
{
    type: 'checkbox',
    message: 'Would you like to view my tweets?',
    name: 'myTweets',
    choices: [
      {
        name: 'Yes'
      },
      {
        name: 'No'
      }
]},
  {
    type: "input",
    message: 'type "Search Your Favorite Song',
    name: "tracks"
  },

]).then(function (answers, myTweets) {
    console.log(JSON.stringify(answers, null, '  '));
    // running all answers but twitter if user chooses NO
   if (answers.myTweets == "No"){

        // Spotify =================================================================
        spotify.search({ type: 'track', query: answers.tracks, limit: 1}, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        
            var artist = data.tracks.items[0].artists[0].name;
            var track =  data.tracks.items[0].name;
            var previewLink = data.tracks.items[0].external_urls.spotify;
            var album = data.tracks.items[0].album.name;
            
            console.log(JSON.stringify("Artist: " + artist, null)); 
            console.log(JSON.stringify("Track: " + track, null)); 
            console.log(JSON.stringify("Preview Link: " + previewLink, null)); 
            console.log(JSON.stringify("Album: " + album, null)); 
        
        });

    } 
    //running all answers if user chooses yes
    else

    {
        // twitter ================================================================
        var params = {screen_name: 'GregorLad'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {

                console.log("");
                console.log("MOST RECENT TWEETS");
                console.log("----------------")

                for (var i = 0; i<tweets.length; i++){
              
                console.log("");
                console.log(tweets[i].text +" " + " Was created on " + tweets[i].created_at);
                console.log("");
                console.log("============================================================================");
                }
            }

        });

        // Spotify =================================================================
        spotify.search({ type: 'track', query: answers.tracks, limit: 1}, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
                var artist = data.tracks.items[0].artists[0].name;
                var track =  data.tracks.items[0].name;
                var previewLink = data.tracks.items[0].external_urls.spotify;
                var album = data.tracks.items[0].album.name;
                
                console.log("");
                console.log("TRACK SEARCH");
                console.log("-------------");
                console.log(JSON.stringify("Artist: " + artist, null)); 
                console.log(JSON.stringify("Track: " + track, null)); 
                console.log(JSON.stringify("Preview Link: " + previewLink, null)); 
                console.log(JSON.stringify("Album: " + album, null)); 
        });
    }
  
});





// var client = require("./keys.js");

// var client = new Twitter({
//  consumer_key: 're03JM1pbLqQjk8cdJs3iolv3',
//  consumer_secret: 'xBzDzl5ZbR3fxJvOwnWR6IBfA1ygCIn9FzQyq3kDFgx8ZAMaIB',
//  access_token_key: '917143346610569218-UTshVjspCF2CqifHLCoVTG9uuVGQyJV',
//  access_token_secret: 'B3QVQQqeQIz29o40EuOREkhgNMA4XCsCcWEi0D7wbKdWl'
// });




// inquirer
// .prompt([
//   // Here we create a basic text prompt.
//   {
//     type: "input",
//     message: 'type "myTweets" to see your tweets',
//     name: "myTweets"
//   },
// ]).then(function (myTweets) {
//   console.log(JSON.stringify(myTweets, null, '  '));
   
//   var params = {screen_name: 'GregorLad'};
//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//    if (!error) {
//      console.log(tweets);
//    }
//   });
  
// });
