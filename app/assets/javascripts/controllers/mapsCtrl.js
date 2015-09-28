ft.controller('mapsCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'mapService',
                          function($scope, uiGmapGoogleMapApi, $log, mapService) {

  $log.currentLevel = $log.LEVELS.debug;

  // Define some variables to be able to initialize the map
  $scope.markers = mapService.markers;

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
        console.log("circle radius radius_changed");
      }
    }
  }

  console.log($scope.map.location.coords)

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

  $scope.map.truckMarkers = [
        {
          id: 1,
          icon: 'https://s3.amazonaws.com/davidmeza/Food_Trucks/foodtruck-icon-web.png',
          latitude: 37.7633,
          longitude: -122.4167,
          showWindow: false,
          options: {
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        },
        {
          id: 2,
          icon: 'https://s3.amazonaws.com/davidmeza/Food_Trucks/foodtruck-icon-web.png',
          latitude: 37.7839,
          longitude: -122.4167,
          showWindow: false,
          options: {
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: true
          }
        },
        {
          id: 3,
          icon: 'https://s3.amazonaws.com/davidmeza/Food_Trucks/foodtruck-icon-web.png',
          latitude: 37.7830,
          longitude: -122.4167,
          showWindow: false,
          options: {
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        }
      ]


  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps)
    $scope.map.refresh = true;
    maps.visualRefresh = true;
  });


}])