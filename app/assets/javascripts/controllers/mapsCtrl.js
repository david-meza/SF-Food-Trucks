ft.controller('mapsCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'mapService', 'foodTruckService',
                          function($scope, uiGmapGoogleMapApi, $log, mapService, foodTruckService) {

  $log.currentLevel = $log.LEVELS.debug;

  // Define some variables to be able to initialize the map
  $scope.markers = mapService.markers;
  $scope.foodTrucks = foodTruckService.foodTrucks;
  $scope.change = { radius: 0 };

  $scope.map = {
    zoom: 15,
    dragging: false,
    refresh: false,
    location: mapService.location,
  }

  $scope.options = {scrollwheel: false};

  $scope.map.circle = {
    center: $scope.map.location.coords,
    // 500 meters
    radius: 500,
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
        console.log("circle radius radius_changed", circle.getRadius());
        $scope.change.radius = circle.getRadius();
      }
    }
  }

  console.log($scope.map.location.coords)

  foodTruckService.getFoodTrucks($scope.map.location.coords.latitude, 
                                 $scope.map.location.coords.longitude,
                                 $scope.map.circle.radius / 1609.34 );

  $scope.$watch('change.radius', function(newVal, oldVal){
    foodTruckService.getFoodTrucks($scope.map.location.coords.latitude, 
                                   $scope.map.location.coords.longitude,
                                   newVal / 1609.34 );
  })

  $scope.map.myLocationMarker = {
    id: 0,
    coords: $scope.map.location.coords,
    options: { draggable: true },
    events: {
      dragend: function (marker, eventName, args) {
        $log.log('marker dragend');
        $log.log(marker.getPosition().lat());
        $log.log(marker.getPosition().lng());
      }
    }
  };

  $scope.genMarkers = function (trucks) {
    mapService.generateMarkers(trucks);
  };

  $scope.map.truckMarkers = foodTruckService.markers;


  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps)
    $scope.map.refresh = true;
    maps.visualRefresh = true;
  });


}])