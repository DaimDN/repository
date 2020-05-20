const express = require('express');
const app = express();
const port = 3000;
var parser = require('body-parser');

app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));

// http://localhost:3000 /
app.get('/', function(req, res){
  res.sendFile(__dirname + "/source/index.html");
});

app.get('/about', function(req, res){
  res.sendFile(__dirname + "/source/about.html")
});


app.listen(port, function(req, res){
  console.log("server is up and running on port" + port);
});
