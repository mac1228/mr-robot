var express = require('express');
var path = require("path");

var app = new express();

var port = process.env.PORT || 3333;

app.use(express.static(__dirname + '/../dist/'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../dist/app.html'));
});

app.listen(port, function() {
    console.log(`App started listening on port ${port}`);
});