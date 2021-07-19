"use strict";

var request = require("request");

var geocode = function geocode(address, callback) {
  var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(address), ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidGF1c2hpa2RhcyIsImEiOiJja3FiNTJoaHEwbmVmMndxdG90eWd2c3Z4In0.5JqDbT2XvBzCXrmgX-Ucbg");
  request({
    url: url,
    json: true
  }, function (error, response) {
    if (error) {
      callback('unable to connect to location services', undefined);
    } else {
      // const [longitude, latitude] = response.body.features[0].center; // array to be destructured in array and object in object
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;