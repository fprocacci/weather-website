const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d84c9c862f6368786df77dee13bea471/' + latitude  +  ',' + longitude; 

    request({ url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to Connect to weather service', error);
        }
        else if (body.error) {
            callback('Unable to find location-1', error);
            
        }
        else
        {
            console.log('Everything is OK-2');
            callback(undefined, {
                summary: body.currently.summary,
                icon: body.currently.icon,
                windBearing: body.currently.windBearing,
                windGust :  body.currently.windGust,
                temperature : body.currently.temperature,
                hourly : body.hourly.summary,
                hourly_time : body.hourly.data
            });   
        }
    })
}

module.exports = forecast;