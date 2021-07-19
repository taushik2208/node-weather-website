"use strict";

var request = require("request");

var forecast = function forecast(lat, _long, callback) {
  var url = "http://api.weatherstack.com/current?access_key=5c543cd7b4320651434ce3f1a011137a&query=".concat(encodeURIComponent(lat), ",").concat(encodeURIComponent(_long));
  request({
    url: url,
    json: true
  }, function (error, response) {
    if (error) {
      callback('Sorry could not connect! Try again', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      var _response$body$curren = response.body.current,
          temperature = _response$body$curren.temperature,
          feelslike = _response$body$curren.feelslike,
          weather_descriptions = _response$body$curren.weather_descriptions;
      callback(undefined, {
        temperature: temperature,
        feelsLike: feelslike,
        weatherDescriptions: weather_descriptions
      });
    }
  });
};

module.exports = forecast;