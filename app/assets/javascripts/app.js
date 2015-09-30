var ft = angular.module('ft', ['restangular', 'uiGmapgoogle-maps', 'flash'])

.config(['uiGmapGoogleMapApiProvider', function (GoogleMapsApi) {
  GoogleMapsApi.configure({
    v: '3.20',
    libraries: 'places,geometry,visualization'
  });
}])

.config(['RestangularProvider', function (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
}])