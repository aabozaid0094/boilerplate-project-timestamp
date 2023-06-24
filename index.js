// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

let isDateString = (date) => {
    return isNaN(Date.parse(date)) ? false : true;
};
let isUnixTimestamp = (date) => {
    let timestamp = date * 1000;
    let time = new Date(timestamp);
    return isNaN(Date.parse(time)) ? false : true;
};
let isValidDate = (date) => {
    return isDateString(date) || isUnixTimestamp(date);
};

let timeType = (req, res, next) => {
    const timestamp = req.params.timestamp;
    if (isValidDate(timestamp)) {
        let jsTimestamp = (isUnixTimestamp(timestamp)) ? new Date(parseInt(timestamp)) : new Date(timestamp) ;
        req.timestampUNIX = jsTimestamp.getTime();
        req.timestampUTC = jsTimestamp.toUTCString();
    }
    next();
};

app.use("/api/:timestamp", timeType);

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
