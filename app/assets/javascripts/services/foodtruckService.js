ft.factory('foodTruckService', ['Restangular', function(Restangular) {
  var foodTrucks = {};
  var markers = {};

  function getFoodTrucks(lat, lon, radius) {
    var kwargs = {
      lat: lat,
      lon: lon,
      radius: radius
    }
    Restangular.all('foodtrucks').getList(kwargs).then(function(data){
      console.log('get food trucks nearby: ', data);
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
        icon: 'https://s3.amazonaws.com/davidmeza/Food_Trucks/foodtruck-icon-web.png',
        latitude: ele.latitude,
        longitude: ele.longitude,
        showWindow: false,
        options: {
          labelAnchor: "22 0",
          labelClass: "marker-labels"
        }
      }

      markers.content.push(marker);
    })
  }

  return {
    foodTrucks: foodTrucks,
    markers: markers,
    getFoodTrucks: getFoodTrucks
  }
}])


