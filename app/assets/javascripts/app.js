var ft = angular.module('ft', ['ui.router', 'restangular'])
.controller('test', ['$scope', function($scope) {
  $scope.msg = 'Hello World';
}])