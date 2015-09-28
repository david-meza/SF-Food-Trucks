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

  $scope.map.circle = {
    center: $scope.map.location,
    // 2000 meters
    radius: 2000,
    stroke: {
      color: '#08B21F',
      weight: 2,
      opacity: 1
    },
    fill: {
      color: '#08B21F',
      opacity: 0.5
    },
    draggable: true, // optional: defaults to false
    clickable: true, // optional: defaults to true
    editable: true, // optional: defaults to false
    visible: true, // optional: defaults to true
    events:{
      radius_changed: function(circle, eventName, model, arguments){
        console.log(circle.getBounds())
        console.log("circle radius radius_changed");
      }
    }
  }

  $scope.map.myLocationMarker = {
    idKey: 0
    coords: $scope.map.location
    click: '{expression}'
    options: '{expression}'
    events: '{expression}'
    control: '{expression}'
  }


  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps)
    $scope.map.refresh = true;
    maps.visualRefresh = true;
  });


}])