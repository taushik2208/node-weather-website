const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5c543cd7b4320651434ce3f1a011137a&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`;
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Sorry could not connect! Try again', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else{
            const { temperature, feelslike, weather_descriptions, weather_icons } = body.current;
            callback(undefined, {
                temperature,
                feelslike,
                weather_descriptions,
                weather_icons
            })
        }
    })
}

module.exports = forecast;