const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

let apiKey = '3de023bd2399753ccd193976efa1e432';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// get method to request info from the API
app.get('/', function (req, res) {
  // render the index.ejs page
  // res.render() is used for templating languages
  res.render('index', {weather: null, error: null});
})

app.post('/', function(req, res) {
  // our city variable equals argv.c OR defaults to gainesville if no city is entered
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

  // when posting, make a request to the API for data
  // pass in url and a callback function to request()
  request(url, function (err, response, body) {
      if(err){
          console.log('error:', error);
          res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
          let weather = JSON.parse(body);

          // check in case user enters something thats not a city
          if (weather.main == undefined) {
              // res.render has an optional second argument — an object where we can 
              // specify properties to be handled by our view
              res.render('index', {weather: null, error: 'Error, please try again'})
          } else {
              let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
              res.render('index', {weather: weatherText, error: null});
          }
      }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})