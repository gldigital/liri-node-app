// Requiring packages
var Twitter = require('twitter');
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
//   =========================================================================

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

//   =========================================================================


// User input
var action = process.argv[2];

// switch case based on user input
switch (action) {
    case "start":
        first();
        break;
  
    case"searches":
        second();
        break;
  }

//   =========================================================================

// function if user want's to see past searches
function second() {
    inquirer
    .prompt([
     
    {
        type: 'checkbox',
        message: 'Would you like to view past Searches?',
        name: 'pastinputs',
        choices: [
          {
            name: 'Yes'
          },
          {
            name: 'No'
          }
    ]},
    ]).then(function (answers, pastinputs) {
        if (answers.pastinputs == "Yes"){

            console.log(pastInput());
        } else {
            first();
        }
    });
}

// function to show past searches
function pastInput() {
    
    // We will read the existing bank file
    fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
        return console.log(err);
    }

    // Break down all the numbers inside
    data = data.split(", ");
    
    // Loop through those numbers and add them together to get a sum.
    for (var i = 1; i < data.length; i++) {

        var datas = data[i]
        console.log("Past Seaches: " + "Did You View My Tweets? " + JSON.parse(datas).myTweets + " | Tracks Searched: " + JSON.parse(datas).tracks + " | Movies Searched: " + JSON.parse(datas).movie); 
    }

    });
}

// function to run the app
function first() {

    // start of application || Inquiring prompts
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
    {
        type: "input",
        message: 'Search Your Favorite Movie Title',
        name: "movie"
    },

    ]).then(function (answers, myTweets) {
        // debugging
        // console.log(JSON.stringify(answers, null, '  '));
        
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
                    
                    console.log("");
                    console.log("TRACK SEARCH");
                    console.log("----------------")
                    console.log(JSON.stringify("Artist: " + artist, null)); 
                    console.log(JSON.stringify("Track: " + track, null)); 
                    console.log(JSON.stringify("Preview Link: " + previewLink, null)); 
                    console.log(JSON.stringify("Album: " + album, null));
                    console.log(""); 
            
            });

            // Movie Info================================================================================
            var queryUrl = "http://www.omdbapi.com/?t=" + answers.movie + "&y=&plot=short&apikey=40e9cece";

            request(queryUrl, function(error, response, body) {
                // If the request is successful
                if (!error && response.statusCode === 200) {
                    
                    console.log("");
                    console.log("MOVIE INFO");
                    console.log("----------------")
                    console.log("");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Released);
                    console.log("IMDB Rating is " + (JSON.parse(body).imdbRating));
                    console.log(JSON.parse(body).Ratings[1].Source + " Raiting is " + JSON.parse(body).Ratings[1].Value );
                    console.log("The Country " + answers.movie + " was produced in " + (JSON.parse(body).Country));
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    
                }
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
                    console.log(JSON.stringify("Artist: " + artist)); 
                    console.log(JSON.stringify("Track: " + track)); 
                    console.log(JSON.stringify("Preview Link: " + previewLink)); 
                    console.log(JSON.stringify("Album: " + album)); 
            });
            // Movie Info================================================================================
            var queryUrl = "http://www.omdbapi.com/?t=" + answers.movie + "&y=&plot=short&apikey=40e9cece";
            
            request(queryUrl, function(error, response, body) {
                // If the request is successful
                if (!error && response.statusCode === 200) {
                    
                    console.log("");
                    console.log("MOVIE INFO");
                    console.log("----------------")
                    console.log("");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Released);
                    console.log("IMDB Rating is " + (JSON.parse(body).imdbRating));
                    console.log(JSON.parse(body).Ratings[1].Source + " Raiting is " + JSON.parse(body).Ratings[1].Value );
                    console.log("The Country " + answers.movie + " was produced in " + (JSON.parse(body).Country));
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    
                }
            });

            // appending user's answers to random.txt
            fs.appendFile("random.txt", ", " + JSON.stringify(answers), function(err) {
                
                // If an error was experienced we say it.
                if (err) {
                    console.log(err);
                }
                
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Content Added!");
                }
                
            });

        }

    });
}