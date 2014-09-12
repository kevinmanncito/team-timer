angular.module('rm.timerDetail', [])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'timer-detail', {
    url: '/timer/:timerId',
    views: {
      'main': {
        controller: 'TimerDetailCtrl',
        templateUrl: 'timerDetail/timerDetail.tpl.html'
      }
    },
    resolve: {
      'timer': ['Rest', '$stateParams', function(Rest, $stateParams) {
        return Rest.getTimer($stateParams.timerId);
      }]
    }
  });
}])


.controller('TimerDetailCtrl', ['$scope', 'timer', function ($scope, timer) {
  $scope.timer = timer.data[0];
}]);
