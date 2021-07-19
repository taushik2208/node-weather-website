const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidGF1c2hpa2RhcyIsImEiOiJja3FiNTJoaHEwbmVmMndxdG90eWd2c3Z4In0.5JqDbT2XvBzCXrmgX-Ucbg`;
   
    request({url: url, json: true}, (error, {body}) => {
    
        if(error){
            callback('unable to connect to location services', undefined);
        } else {
            const [longitude, latitude] = body.features[0].center; 
            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name
            });
        }
    })
    
};
module.exports = geocode;