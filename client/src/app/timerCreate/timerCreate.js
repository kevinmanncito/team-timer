angular.module('rm.timerCreate', [])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'create-timer', {
    url: '/create-timer',
    views: {
      'main': {
        controller: 'CreateTimerCtrl',
        templateUrl: 'timerCreate/timerCreate.tpl.html'
      }
    }
  });
}])


.controller('CreateTimerCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
  $scope.data = {
    name: "Untitled",
    type: "up",
    status: "off",
    description: "",
    currentTime: 0,
    baseTime: moment(),
    created: moment()
  };
  $scope.saveTimer = function() {
    $http.post('/rest/timers', $scope.data).then( function(res) {
      console.log(res);
      $state.go('timer-detail', {timerId: res.data._id});
    }, function(err) {
      $scope.error = true;
    });
  };
}]);
