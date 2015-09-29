ft.factory('foodTruckService', ['Restangular', '$filter', function(Restangular, $filter) {
  var foodTrucks = {};
  var markers = {};
  var idShowing = null;

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
        applicant: ele.applicant,
        fooditems: ele.fooditems,
        dayshours: ele.dayshours,
        icon: 'https://s3.amazonaws.com/davidmeza/Food_Trucks/foodtruck-icon-web.png',
        latitude: ele.latitude,
        longitude: ele.longitude,
        showWindow: false,
        options: {
          title: ele.applicant,
          labelAnchor: "22 0",
          labelClass: "marker-labels"
        },
        onMarkerClicked: onMarkerClicked
      }

      markers.content.push(marker);
    })
  }

  function onMarkerClicked() {
    console.log("clicked marker")
    console.log(this)
    
    // If idShowing is not null, meaning another marker window is shown, 
    // then set showWindow of that marker window to false.
    if(idShowing){
      var tohide=$filter('filter')(markers.content,{id:idShowing})[0];
      tohide.showWindow = false;
    }

    idShowing = this.id;
    this.showWindow = true;
  }

  return {
    foodTrucks: foodTrucks,
    markers: markers,
    getFoodTrucks: getFoodTrucks
  }
}])


