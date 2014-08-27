angular.module('rm.timer', [
  'ui.router.state'
])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'create-timer', {
    url: '/create-timer',
    views: {
      'main': {
        controller: 'CreateTimerCtrl',
        templateUrl: 'timer/timerCreatePage.tpl.html'
      }
    }
  });
}])


.controller('CreateTimerCtrl', ['$scope', function ($scope) {
  $scope.data = {
    name: "Untitled",
    type: "up",
    status: "off",
    description: "",
    currentTime: 0,
    created: Date.now()
  };
}])


.directive('timer', ['$interval', function($interval) {
  return {
    templateUrl: 'timer/timer.tpl.html',
    replace: true,
    restrict: 'E',
    scope: {
      timerData: '='
    },
    link: function ($scope, iElement, iAttrs) {
      $scope.toggleType = function() {
        if ($scope.timerData.type === 'up') {
          $scope.timerData.type = 'down';
          $scope.timeNotSet = true;
        } else {
          $scope.timerData.type = 'up';
          $scope.timeNotSet = false;
        }
      };
      $scope.resetTimer = function() {
        $scope.timerData.currentTime = 0;
        $scope.timerData.created = Date.now();
        $scope.timerData.status = 'off';
      };
      $scope.togglePlayPause = function() {
        if ($scope.timerData.status === 'on') {
          $scope.timerData.status = 'off';
        } else {
          $scope.timerData.status = 'on';
        }
      };
      $scope.setCountdown = function() {
        $scope.timeNotSet = false;
      };
    }
  };
}]);
