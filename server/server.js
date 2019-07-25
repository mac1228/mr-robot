// var express = require('express');
// var path = require("path");

// var app = new express();

// var port = process.env.PORT || 3333;

// app.use(express.static(__dirname + '/../dist/'));

// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname + '/../dist/app.html'));
// }).listen(port, function() {
//     console.log(`App started listening on port ${port}`);
// });

const express = require('express')
const app = express()
const port = process.env.PORT || 3333;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))