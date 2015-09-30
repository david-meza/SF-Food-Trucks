ft.controller('mapsCtrl', ['$scope', 'uiGmapGoogleMapApi', 'mapService', 'foodTruckService',
                          function($scope, uiGmapGoogleMapApi, mapService, foodTruckService) {

  // Define some variables to be able to initialize the map
  $scope.foodTrucks = foodTruckService.foodTrucks;

  // Track previous opened marker window
  $scope.idShowing = foodTruckService.idShowing;

  // Maps settings
  $scope.map = mapService.map

  // Get our map instance when it loads
  $scope.map.events = {
    tilesloaded: function (map) {
      $scope.mapInstance = map
      styleMap($scope.gmaps, map)
      // $scope.$apply(function () {
      // });
    }
  };

  // Nicer style. Still allow switching back to default
  var styleMap = function() {
    $scope.map.options.mapTypeControlOptions.mapTypeIds.push($scope.gmaps.MapTypeId.ROADMAP)
    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = $scope.gmaps.StyledMapType($scope.map.styles, { name: "Light Dream Map" });

    //Associate the styled map with the MapTypeId and set it to display.
    $scope.mapInstance.mapTypes.set('light_dream', styledMap);
    $scope.mapInstance.setMapTypeId('light_dream');
  };

  // Grab location from map service
  $scope.userLoc = {
    latitude: mapService.location.coords.latitude,
    longitude: mapService.location.coords.longitude
  };

  // Make an API call to update foodTrucks when map radius or the current location is changed
  $scope.$watchGroup(['map.circle.radius', 'map.circle.center.latitude', 'map.circle.center.longitude'], function(){
    foodTruckService.getFoodTrucks($scope.map.circle.center.latitude,
                                   $scope.map.circle.center.longitude,
                                   $scope.map.circle.radius / 1609.34 );
  })

  // Marker for current location (Geolocation or dragging map to a different location)
  $scope.map.myLocationMarker = {
    id: 0,
    coords: $scope.userLoc,
    options: { draggable: false, clickable: false },
  };

  // Get Food Truck Markers
  $scope.map.truckMarkers = foodTruckService.markers;


  // Search box
  var events = {
    places_changed: function (searchBox) {
      console.log(searchBox.getPlaces()[0].geometry.location);
      var loc = searchBox.getPlaces()[0].geometry.location;
      var latitude = loc['A'];
      var longitude = loc['F'];
      mapService.updateCoords(latitude, longitude);
    }
  }
  $scope.searchbox = {
    template: 'templates/searchbox.html',
    events: events
  };


  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    $scope.gmaps = maps;
  });

}])