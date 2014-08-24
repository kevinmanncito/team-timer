angular.module( 'lk.home', [
  'ui.router.state'
])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    }
  });
}])


.controller( 'HomeCtrl', ['$scope', function ($scope) {
}]);
