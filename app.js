'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

function getNaturalTime(time) {
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    var date = new Date(time);
    var naturalDate =  monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();


    return naturalDate;
}

function getUnixTime(time) {

    var date = new Date(time).getTime();
    date = Math.floor(date / 1000);
    return date;
}

function getJsonTime(unixTime, naturalTime) {

    var jsonTime = {
        'unix': unixTime,
        'natural': naturalTime
    };

    return jsonTime;
}


app.get('/', function(req, res) {
   res.send(getJsonTime(0, 0));
});

app.get('/:time', function(req, res) {
    var maybeUnixTimestamp = Math.floor(parseInt(req.params.time) * 1000);

    if(!isNaN(maybeUnixTimestamp) && (new Date(maybeUnixTimestamp)).getTime() > 0 ) {

        res.json(getJsonTime(getUnixTime(maybeUnixTimestamp), getNaturalTime(maybeUnixTimestamp)));

    } else if((new Date(req.params.time)).getTime() > 0 ) {

        res.json(getJsonTime(getUnixTime(req.params.time), req.params.time));

    } else {

        res.json(getJsonTime(0, 0));

    }
});



app.listen(port, function(err, data) {
    if(err)
        throw err;

    console.log('Server started');
});
