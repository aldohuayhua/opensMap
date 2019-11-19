require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var os = require("os");
Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var artist = process.argv.slice(3).join(" ");
var userCommand = process.argv[2];
if (userCommand === "spotify-this-song") {
    spotify
        .search({ type: 'track', query: artist })
        .then(function (response) {
            for (i = 0; i < response.tracks.items.length; i++) {
                console.log("Artist: " + JSON.stringify(response.tracks.items[i].artists[0].name, null, 2));
                console.log("Song Name: " + JSON.stringify(response.tracks.items[i].name, null, 2));
                console.log("Album Name: " + JSON.stringify(response.tracks.items[i].album.name, null, 2));
                console.log("Song Preview: " + JSON.stringify(response.tracks.items[i].external_urls.spotify, null, 2));
                console.log("**************************************************************");
                var answer = {
                    Artist: response.tracks.items[i].artists[0].name,
                    SongName: response.tracks.items[i].name,
                    AlbumName: response.tracks.items[i].album.name,
                    SongPreview: response.tracks.items[i].external_urls.spotify
                }
                fs.appendFile("log.txt", "New Log Entry: " + JSON.stringify(answer) + os.EOL, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("log.txt was updated!");
                });
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};
if (userCommand === "concert-this") {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function (result) {
            for (i = 0; i < result.data.length; i++) {
                console.log("Venue: " + JSON.stringify(result.data[i].venue.name, null, 2));
                console.log("City: " + JSON.stringify(result.data[i].venue.city, null, 2));
                console.log("Date & Time: " + JSON.stringify(result.data[i].datetime, null, 2));
                console.log("**************************************************************");
                var answer = {
                    Venue: result.data[i].venue.name,
                    City: result.data[i].venue.city,
                    DateAndTime: result.data[i].datetime
                }
                fs.appendFile("log.txt", "New Log Entry: " + JSON.stringify(answer) + os.EOL, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("log.txt was updated!");
                });
            }
        })
};
if (userCommand === "movie-this") {
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + artist;
    axios.get(queryURL).then(
        function (result) {
            console.log("Movie Title: " + JSON.stringify(result.data.Title, null, 2))
            console.log("Year Released: " + JSON.stringify(result.data.Year, null, 2))
            console.log("IMDB Rating: " + JSON.stringify(result.data.imdbRating, null, 2))
            console.log("Roten Tomatoes Rating: " + JSON.stringify(result.data.Ratings[1].Value, null, 2))
            console.log("Country Produced on: " + JSON.stringify(result.data.Country, null, 2))
            console.log("Language: " + JSON.stringify(result.data.Language, null, 2))
            console.log("Plot: " + JSON.stringify(result.data.Plot, null, 2))
            console.log("**************************************************************");
            var answer = {
                MovieTitle: result.data.Title,
                YearReleased: result.data.Year,
                IMDBRating: result.data.imdbRating,
                RotenTomatoesRating: result.data.Ratings[1].Value,
                CountryProducedOn: result.data.Country,
                Language: result.data.Language,
                Plot: result.data.Plot
            }
            fs.appendFile("log.txt", "New Log Entry: " + JSON.stringify(answer) + os.EOL, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("log.txt was updated!");
            });
        })
};
if (userCommand === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        var userCommand = dataArr[0];
        var artist = dataArr[1];
        if (userCommand === "spotify-this-song") {
            spotify
                .search({ type: 'track', query: artist })
                .then(function (response) {
                    for (i = 0; i < response.tracks.items.length; i++) {
                        console.log("Artist: " + JSON.stringify(response.tracks.items[i].artists[0].name, null, 2));
                        console.log("Song Name: " + JSON.stringify(response.tracks.items[i].name, null, 2));
                        console.log("Album Name: " + JSON.stringify(response.tracks.items[i].album.name, null, 2));
                        console.log("Song Preview: " + JSON.stringify(response.tracks.items[i].external_urls.spotify, null, 2));
                        console.log("**************************************************************")
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else if (userCommand === "concert-this") {
            var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
            axios.get(queryURL).then(
                function (result) {
                    for (i = 0; i < result.data.length; i++) {
                        console.log("Venue: " + JSON.stringify(result.data[i].venue.name, null, 2));
                        console.log("City: " + JSON.stringify(result.data[i].venue.city, null, 2));
                        console.log("Date & Time: " + JSON.stringify(result.data[i].datetime, null, 2));
                        console.log("**************************************************************")
                    }
                })
        } else if (userCommand === "movie-this")
            var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + artist;
        axios.get(queryURL).then(
            function (result) {
                console.log("Movie Title: " + JSON.stringify(result.data.Title, null, 2))
                console.log("Year Released: " + JSON.stringify(result.data.Year, null, 2))
                console.log("IMDB Rating: " + JSON.stringify(result.data.imdbRating, null, 2))
                console.log("Roten Tomatoes Rating: " + JSON.stringify(result.data.Ratings[1].Value, null, 2))
                console.log("Country Produced on: " + JSON.stringify(result.data.Country, null, 2))
                console.log("Language: " + JSON.stringify(result.data.Language, null, 2))
                console.log("Plot: " + JSON.stringify(result.data.Plot, null, 2))
                console.log("**************************************************************")
            })
        if (error) {
            return console.log(error);
        }
    });
}