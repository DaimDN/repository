const express = require('express');
const app = express();
const port = 3000;
var parser = require('body-parser');
const heroes = require('superheroes');
const villains =  require('supervillains');
const dogNames = require('dog-names');
const https = require('https');


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
app.get('/weather', function(req, res){
  res.sendFile(__dirname + "/source/weather.html");
});

app.post('/weather', function(req, res){

  const apikey = "eab8f68e350ecc5328039365fa2c81f7";
  const city = req.body.wname;
  const unit = "metric"
  const country = req.body.country;


 const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&appid="+apikey + "&units="+unit;


  https.get(url, function(response){
    console.log(response.statusCode);

      response.on("data", function(data){
        var weatherData = JSON.parse(data);

        //these are retrieved variable //

        var name = weatherData.name;
        var temperature = Math.round(weatherData.main.temp) + " C";
        var Humidity = weatherData.main.humidity;
        var desc = weatherData.main.pressure;

        res.write("<h1> Country: " +country + "  CityName : " + name + "<br>");
        res.write("<h1> The Current temperature is : " + temperature);
        res.write("<br><br> The Humidity is :  " + Humidity )
        res.write("<br><br> The pressure is : " + desc);

        res.send();
      }).on('error', (e) => {
  console.log(e);
});
  });
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
