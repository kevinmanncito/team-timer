angular.module( 'rm.home', [
  'ui.router.state',
  'rm.data',
  'rm.timer'
])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      'main': {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    resolve: {
      'timers': ['Rest', function(Rest) {
        return Rest.getTimers();
      }]
    }
  });
}])


.controller( 'HomeCtrl', ['$scope', 'timers', function ($scope, timers) {
  $scope.timers = timers.data;
}]);
