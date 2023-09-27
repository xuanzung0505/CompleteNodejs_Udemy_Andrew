const request = require('postman-request');
const ACCESS_KEY = "b59018cecb9c4a99a6ed251a2dab951e"

const url = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=37.8267,-122.4233`

request({url: url, json: true}, function (error, response, body) {
  const data = response.body
  console.log(data)
});