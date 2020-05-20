const express = require('express');
const app = express();
const port = 3000;
var parser = require('body-parser');
const heroes = require('superheroes');
const villains =  require('supervillains');
const dogNames = require('dog-names');


app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));

// http://localhost:3000 /
app.get('/', function(req, res){
  res.sendFile(__dirname + "/source/index.html");
});

app.get('/heroes', function(req, res){
  res.send("<h1>" + heroes.random());
});
app.get('/dognames', function(req, res){
  res.sendFile(__dirname + "/source/dogname.html")
})

app.post('/names', function(req, res){
  var option = req.body.options;

  if(option == "male"){
      res.send("<h1> The male dog name is : "+ dogNames.maleRandom());
  }
  else{
    res.send("<h1> The female dog name is :"+ dogNames.femaleRandom());
  }



})

app.get('/villains', function(req, res){
  res.send("<h1>" + villains.random());
})
app.post('/', function(req, res){
  var fullname = req.body.personname;
  res.write("<h1> Welcome  " + fullname);
  res.write("<br> <h1> your saviour is " + heroes.random());
  res.write("<br><br> Please stay away from " + villains.random());
  res.send();
});

app.get('/about', function(req, res){
  res.sendFile(__dirname + "/source/about.html")
});


app.listen(port, function(req, res){
  console.log("server is up and running on port" + port);
});
