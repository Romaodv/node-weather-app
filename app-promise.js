const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://dev.virtualearth.net/REST/v1/Locations?addressLine=${encodedAddress}&key=AgXk5YLL9FkxIp9A3zODsOyE84GeYTMB5jr7A-EmEs1YTejcXSsn8pA2CqhV1I2e`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.resourceSets[0].estimatedTotal === 0){
    throw new Error('Unable to find that address.')
  }
  var lat = response.data.resourceSets[0].resources[0].point.coordinates[0];
  var long = response.data.resourceSets[0].resources[0].point.coordinates[1];
  var weatherUrl = `https://api.darksky.net/forecast/e4b0c98a7bdcb64af635c3fbc2352772/${lat},${long}`;
  console.log(response.data.resourceSets[0].resources[0].name);
  return axios.get(weatherUrl);
}).then((response)=> {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers');
  } else{
    console.log(e.message);
  }
});
