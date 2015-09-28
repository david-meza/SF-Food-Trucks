ft.factory('foodtruckService', ['Restangular', function(Restangular) {
  var foodTrucks = {};

  function getFoodTrucks(lat, lon, radius) {
    var kwargs = {
      lat: lat,
      lon: lon,
      radius: radius
    }
    Restangular.all('foodtrucks').getList(kwargs).then(function(data){
      console.log('get food trucks nearby: ', data);
      foodtrucks.list = data;
    }, function(error){
      console.log('fail to get food trucks: ', error);
    })
  }

  return {
    foodtrucks: foodtrucks,
    getFoodTrucks: getFoodTrucks
  }
}])