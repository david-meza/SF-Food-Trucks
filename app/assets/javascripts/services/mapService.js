ft.factory("mapService", ['Flash', function(Flash){

  var location = {};

  // Temporary coordinates while Geoloc gets us the user's coords
  location.coords = {
    latitude: 37.780535,
    longitude: -122.395334
  };

  var map = {
    zoom: 16,
    // turns to true when the map is being dragged
    dragging: false,
    // set to true to trigger a map refresh when necessary
    refresh: false,
    pan: false,
    location: location,
    control: {},
    options: {
      scrollwheel: false,
      mapTypeControlOptions: {
        mapTypeIds: ['light_dream', 'roadmap']
      }
    },
    clusterMarkers: true,
    clusterOptions: {
      title: 'Zoom in to find food!',
      gridSize: 60,
      ignoreHidden: true,
      minimumClusterSize: 3
    }
  };

  // Optional map themes
  // map.options.styles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
  map.options.styles = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#b5cbe4"}]},{"featureType":"landscape","stylers":[{"color":"#efefef"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#83a5b0"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#bdcdd3"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e3eed3"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]

  // Map circle (radius to find food trucks)
  map.circle = {
    // Only get the scalar values, so circle center is disconnected from map dragging
    center: { latitude: location.coords.latitude, longitude: location.coords.longitude },
    // 500 meters
    radius: 500,
    stroke: {
      color: '#0a5a9c',
      weight: 3,
      opacity: 1
    },
    fill: {
      color: '#428bca',
      opacity: 0.3
    },
    draggable: true,
    clickable: false,
    editable: true,
    visible: true,
  };

  var getCoords = function() {

  // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( function (position) {
        updateCoords(position.coords.latitude, position.coords.longitude);
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Geolocation not supported")
    }
  }

  getCoords();

  var _isInSF = function (lat, lon) {
    return lat < 37.811072 && lat > 37.615523 && lon > -122.532921 && lon < -122.331047
  }

  var updateCoords = function (lat, lon) {
    if (_isInSF(lat, lon)) {
      // Update the location obj with the accurate user coords
      location.coords.latitude = lat;
      location.coords.longitude = lon;
      map.circle.center.latitude = lat;
      map.circle.center.longitude = lon;
    } else {
      // Otherwise, keep using default coordinates
      var message = '<strong> Oops!</strong>  It seems this location is not in San Francisco.';
      Flash.create('warning', message);
    }
  }

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

  return {
    location: location,
    updateCoords: updateCoords,
    map: map,
  }

}]);

