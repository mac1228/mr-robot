'use strict';

var express = require('express');
var path = require("path");
var bot = require('./bot');

var app = new express();

var port = process.env.PORT || 3333;

app.use(express.static(__dirname + '/../dist/'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../dist/app.html'));
});

bot.setup(app);

app.listen(port, function() {
    console.log(`App started listening on port ${port}`);
});