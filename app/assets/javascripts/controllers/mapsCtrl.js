ft.controller('mapsCtrl', ['$scope', 'uiGmapGoogleMapApi', 'mapService', 'foodTruckService',
                          function($scope, uiGmapGoogleMapApi, mapService, foodTruckService) {

  // Define some variables to be able to initialize the map
  $scope.foodTrucks = foodTruckService.foodTrucks;

  // Maps settings
  $scope.map = mapService.map

  // Get our map instance when it loads
  $scope.map.events = {
    tilesloaded: function () {
      $scope.mapInstance = $scope.map.control.getGMap()
    }
  };

  // Make an API call to update foodTrucks when map radius or the current location is changed
  $scope.$watchGroup(['map.circle.radius', 'map.circle.center.latitude', 'map.circle.center.longitude'], function(){
    foodTruckService.getFoodTrucks($scope.map.circle.center.latitude,
                                   $scope.map.circle.center.longitude,
                                   $scope.map.circle.radius / 1609.34 );
  })

  // Get Food Truck Markers
  $scope.map.truckMarkers = foodTruckService.markers;


  // Search box
  var events = {
    places_changed: function (searchBox) {
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