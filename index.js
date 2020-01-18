require('dotenv').config();
const request = require('request');
const argv = require('yargs').argv;

let apiKey = process.env.API_KEY;

// our city variable equals argv.c OR defaults to gainesville if no city is entered
let city = argv.c || 'gainesville';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

// pass in url and a callback function
request(url, function (err, response, body) {
  if(err){
    // if there is an error, log the error and end
    console.log('error:', error);
  } else {
    // if there is no error, log the body of the response
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});