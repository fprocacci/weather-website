const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnByb2NhY2NpIiwiYSI6ImNqdXZrbXZobDAycDA0NHB2cDU2bDVyNzUifQ.RfUOTapCKHh4KP9EwmUENA&limit=1'; 

    request({ url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to Connect', error);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location', {error});
        }
        else
        {
            console.log('Everything is OK-1');
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;