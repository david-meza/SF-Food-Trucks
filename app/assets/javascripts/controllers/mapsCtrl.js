ft.controller('mapsCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapLogger',
                          function($scope, uiGmapGoogleMapApi, $log) {
  $scope.msg = 'Hello World';

  $log.currentLevel = $log.LEVELS.debug;

  $scope.markers = []

  $scope.map = {
    zoom: 15,
    dragging: false,
    refresh: true,
  }

  // $scope.map.center = {
  //   latitude: 45,
  //   longitude: -73
  // }

  $scope.options = {scrollwheel: false};

  $scope.map.location = {
    latitude: 37.7833,
    longitude: -122.4167
  }

  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps)
    $scope.printMaps = maps;
    $scope.googleVersion = maps.version;
    $scope.map.refresh = true;
    maps.visualRefresh = true;
    $log.info('$scope.map.rectangle.bounds set');
  });


}])