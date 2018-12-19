const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `http://dev.virtualearth.net/REST/v1/Locations?addressLine=${encodedAddress}&key=AgXk5YLL9FkxIp9A3zODsOyE84GeYTMB5jr7A-EmEs1YTejcXSsn8pA2CqhV1I2e`,
      json: true
    },(error, response, body) => {
      if (error) {
        reject('Unable to connect to Bing servers.');
      }else if(body.resourceSets[0].estimatedTotal === 0){
        reject('Unable to find that address. :(');
      }else if (body.resourceSets[0].estimatedTotal !== 0) {
        resolve({
          address: body.resourceSets[0].resources[0].name,
          latitude: body.resourceSets[0].resources[0].point.coordinates[0],
          longitude: body.resourceSets[0].resources[0].point.coordinates[1]
        });
    }
    });
  });
};

geocodeAddress('asdasdfds').then((location) =>{
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) =>{
  console.log(errorMessage);
});
