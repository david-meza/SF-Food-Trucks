var ft = angular.module('ft', ['ui.router', 'restangular', 'uiGmapgoogle-maps'])

.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
//    key: 'your api key',
    // v: '3.20',
    libraries: 'weather,geometry,visualization'
  });
}])