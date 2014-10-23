angular.module('rm.timerCreate', [])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'createTimer', {
    url: '/create-timer',
    views: {
      'main': {
        controller: 'CreateTimerCtrl',
        templateUrl: 'timerCreate/timerCreate.tpl.html'
      }
    }
  });
}])


.controller('CreateTimerCtrl', [
  '$scope', 
  '$http', 
  '$state', 
  '$moment', 
  'Token',
function (
  $scope, 
  $http, 
  $state, 
  $moment,
  Token
) {
  $scope.data = {
    name: "Untitled",
    type: "up",
    status: "off",
    description: "",
    currentTime: 0,
    baseTime: $moment(),
    created: $moment(),
    user: 0
  };
  $scope.saveTimer = function() {
    $http.post('/rest/timers', $scope.data).then(function (res) {
      $state.go('timerDetail', {timerId: res.data._id});
    }, function (err) {
      $scope.error = true;
    });
  };
}]);
