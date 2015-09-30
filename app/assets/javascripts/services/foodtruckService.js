ft.factory('foodTruckService', ['Restangular', function(Restangular) {
  var foodTrucks = {};
  var markers = {};
  var currentMarker = { obj: {} };

  function getFoodTrucks(lat, lon, radius) {
    var kwargs = {
      lat: lat,
      lon: lon,
      radius: radius
    }
    Restangular.all('foodtrucks').getList(kwargs).then(function(data){
      foodTrucks.list = data;
      markers.content = [];
      _generateMarkers(data);
    }, function(error){
      console.log('fail to get food trucks: ', error);
    })
  }

  function _generateMarkers(data) {
    data.forEach(function(ele){
      var marker = {
        id: ele.id,
        applicant: ele.applicant,
        fooditems: ele.fooditems,
        dayshours: ele.dayshours,
        icon: 'https://s3.amazonaws.com/davidmeza/Food_Trucks/foodtruck-icon-web.png',
        latitude: ele.latitude,
        longitude: ele.longitude,
        showWindow: false,
        onMarkerClicked: onMarkerClicked,
        options: {
          title: ele.applicant,
          labelAnchor: "22 0",
          labelClass: "marker-labels"
        },
      }

      markers.content.push(marker);
    })
  }

  function onMarkerClicked() {
    // If currentMarker is not null, meaning another marker window is shown,
    // then set showWindow of that marker window to false.
    currentMarker.obj.showWindow = false
    currentMarker.obj = this
    this.showWindow = true;

  }

  return {
    foodTrucks: foodTrucks,
    markers: markers,
    getFoodTrucks: getFoodTrucks
  }
}])


