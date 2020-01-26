var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

//Require models
var db = require(".models");

var PORT = process.env.PORT || 3000;

var app = express();

//use morgan logger for loggin request
app.use(logger("dev"));
//parse request body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static folder made public
app.use(express.static("public"));

MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1:password1@ds211269.mlab.com:11269/heroku_q0vfg6k5";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//connection to mongo db

//scraping
app.get("/scrape", function(req, res) {
    //grab body of the html with axios
    axios.get("http://www.nyt.com/").then(function(response) {
        //load into cheerio and save it
        var $ = cheerio.load(response.data);
        //grab every h2 within an article tag
        $(".theme-summary").each(function(i, element) {
            //save an empty result object
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
        })
    })
})

//.theme-summary
//.story-heading
//e.summary