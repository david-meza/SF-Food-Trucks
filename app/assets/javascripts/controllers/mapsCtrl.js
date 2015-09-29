ft.controller('mapsCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'mapService', 'foodTruckService',
                          function($scope, uiGmapGoogleMapApi, $log, mapService, foodTruckService) {

  // Logs Google Maps API events
  // $log.currentLevel = $log.LEVELS.debug;

  // Define some variables to be able to initialize the map
  $scope.foodTrucks = foodTruckService.foodTrucks;

  // Track previous opened marker window
  $scope.idShowing = foodTruckService.idShowing;

  // Maps settings
  $scope.map = {
    zoom: 16,
    dragging: false,
    refresh: false,
    location: mapService.location,
    clusterMarkers: true,
    clusterOptions: {
      title: 'Zoom in to find food!',
      gridSize: 60,
      ignoreHidden: true,
      minimumClusterSize: 3
    }
  }
  $scope.options = {scrollwheel: false};


  // Map circle (radius to find food trucks)
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
    draggable: false, // optional: defaults to false
    clickable: false, // optional: defaults to true
    editable: true, // optional: defaults to false
    visible: true, // optional: defaults to true
    events:{
      radius_changed: radius_changed
    }
  }

  function radius_changed(circle, eventName, model, arguments) {
    console.log(circle.getBounds())
    console.log("circle radius radius_changed", circle.getRadius());
    $scope.change.radius = circle.getRadius();
  }

  // Makes an API call to update foodTrucks when map radius or the current location is changed
  $scope.change = { radius: $scope.map.circle.radius };

  console.log($scope.map.location.coords)

  $scope.$watchGroup(['change.radius', 'map.location.coords.latitude', 'map.location.coords.longitude'], function(newVal, oldVal){
    foodTruckService.getFoodTrucks($scope.map.location.coords.latitude,
                                   $scope.map.location.coords.longitude,
                                   $scope.map.circle.radius / 1909.34 );
  })

  // Marker for current location (Geolocation or dragging map to a different location)
  $scope.map.myLocationMarker = {
    id: 0,
    coords: $scope.map.location.coords,
    options: { draggable: false, clickable: false },
    events: {
      dragend: function (marker, eventName, args) {
        $log.log('marker dragend');
        $log.log(marker.getPosition().lat());
        $log.log(marker.getPosition().lng());
      }
    }
  };

  // Get Food Truck Markers
  $scope.map.truckMarkers = foodTruckService.markers;


  // Search box
  var events = {
    places_changed: function (searchBox) {
      console.log(searchBox.getPlaces()[0].geometry.location)
      var loc = searchBox.getPlaces()[0].geometry.location
      $scope.map.location.coords.latitude = loc['A']
      $scope.map.location.coords.longitude = loc['F']
    }
  }
  $scope.searchbox = {
    template:'templates/searchbox.html',
    events:events
  };


  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps)
    $scope.map.refresh = true;
    maps.visualRefresh = true;
  });


}])