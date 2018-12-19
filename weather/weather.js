const request = require('request');

var getWeather = (lat, long, callback) =>{
  request({
    url: `https://api.darksky.net/forecast/e4b0c98a7bdcb64af635c3fbc2352772/${lat},${long}`,
    json: true
  },(error, response, body) => {
    if(!error && response.statusCode ===200){
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }else{
      callback('Unable to fetch weather');
    }
  })

};

module.exports.getWeather = getWeather;
