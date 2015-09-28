ft.factory("mapService", ['Restangular', function(Restangular){

  var location = {};
  // Temporary coordinates while Geoloc gets us the user's coords
  location.coords = {
    latitude: 37.7833,
    longitude: -122.4167
  };

  console.log("init map service")


  var getCoords = function() {

  // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        // Update the location obj with the accurate user coords
        location.coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Geolocation not supported")
    }
  }

  getCoords();


  return {
    location: location
  }
}]);

