ft.factory("mapService", function(){

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
        var lat = position.coords.latitude
        var lon = position.coords.longitude
        updateCoords(lat, lon);
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Geolocation not supported")
    }
  }

  function _isInSF(lat, lon) {
    return lat < 37.78605   && 
           lat > 37.69375   && 
           lon > -122.52138 && 
           lon < -122.36483
  }

  function updateCoords(lat, lon) {
    if (_isInSF(lat, lon)) {
      // Update the location obj with the accurate user coords
      location.coords.latitude = lat;
      location.coords.longitude = lon;
    } else {
      // Otherwise, use default coordinates
      alert("Sorry, our service is only available in SF! The map is redirected to SF.");
    }
  }

  getCoords();

  var createMarker = function (truck) {
    var idKey = truck.id
    var latitude = truck.latitude;
    var longitude = truck.longitude;
    var marker = {
      latitude: latitude,
      longitude: longitude,
      title: truck.name
    };
    return marker;
  };

  var clusterTypes = ['standard','food_truck'];
  var selectedClusterTypes = {
    food_truck:{
      title: 'Food!',
      gridSize: 60,
      ignoreHidden: true,
      minimumClusterSize: 2,
      enableRetinaIcons: true,
      styles: [{
        url: 'http://dribbble.s3.amazonaws.com/users/41719/screenshots/1176590/food_truck.png',
        textColor: '#ccc',
        textSize: 18,
        width: 33,
        height: 33,
      }]
    },
    standard:{
      title: 'Many food trucks in this area', gridSize: 60, ignoreHidden: true, minimumClusterSize: 2
    }
  };

  return {
    location: location,
    updateCoords: updateCoords
  }
});

