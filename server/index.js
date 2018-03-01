var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var app = express();

var Launches = require('./data/launches.json');
var LaunchPads = require('./data/launchpads.json');

app.use(morgan("common"));
app.use(cors({  
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/launches", function(req, res) {
    res.json({
        status: "ok",
        data: Launches
    });
});

app.get("/launchpads", function(req, res) {
    res.json({
        status: "ok",
        data: LaunchPads
    });
});

app.listen(3001, function() {  
    console.log("My API is running...");
});

module.exports = app; 