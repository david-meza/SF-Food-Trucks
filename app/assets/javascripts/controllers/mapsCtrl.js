ft.controller('mapsCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'mapService',
                          function($scope, uiGmapGoogleMapApi, $log, mapService) {

  $log.currentLevel = $log.LEVELS.debug;

  // Define some variables to be able to initialize the map
  $scope.markers = [];

  $scope.map = {
    zoom: 15,
    dragging: false,
    refresh: false,
    location: mapService.location,
  }

  $scope.options = {scrollwheel: false};


  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps)
    $scope.map.refresh = true;
    maps.visualRefresh = true;
  });


}])