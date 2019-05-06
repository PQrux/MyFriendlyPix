export default class Coordinates {
  constructor(){
    this.googleMapsClient = require('@google/maps').createClient({
      Promise: Promise,
      key: 'AIzaSyCLDV2YwhDZkRzb2gEVQISQXGwrN91EOp4'
    });
  }
  getUserGeolocationText(){
    return new Promise((resolve,reject) => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos) => {
          let coordinates = pos.coords;
          let coord = { 
            latlng: [ coordinates.latitude, coordinates.longitude ],
            result_type: ["locality", "political","administrative_area_level_2"],
            language: "pt-BR"
          }
          this.googleMapsClient.reverseGeocode(coord).asPromise()
          .then(function(response) {
            resolve(response.json.results[0].formatted_address);
          });
        });
      }
      else{
        resolve(null);
      }
    });
  }
}