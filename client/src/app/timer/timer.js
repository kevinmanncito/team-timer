angular.module('rm.timer', [
  'ui.router.state',
  'angularMoment'
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


.factory('timerSocket', ['socketFactory', function(socketFactory) {
  return socketFactory();
}])


.controller('CreateTimerCtrl', ['$scope', function ($scope) {
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
    console.log($scope.data);
  };
}])


.directive('timer', ['$interval', 'moment', function($interval, moment) {
  return {
    templateUrl: 'timer/timer.tpl.html',
    replace: true,
    restrict: 'E',
    scope: {
      timerData: '='
    },
    link: function ($scope, iElement, iAttrs) {
      // This makes the clock tick
      $interval(function () {
        if ($scope.timerData.status === 'on') {
          if ($scope.timerData.type === 'up') {
            $scope.timerData.currentTime += 1;
          } else {
            $scope.timerData.currentTime -= 1;
          }
          if ($scope.timerData.currentTime < 0) {
            $scope.timerData.currentTime = 0;
            $scope.timerData.status = 'off';
            $scope.timeValidator();
          }
          $scope.timeValidator();
        }
      }, 1000);
      $scope.hours = 0;
      $scope.minutes = 0;
      $scope.seconds = 0;
      $scope.calculateHoursMinutesSeconds = function() {
        var tempTime = $scope.timerData.currentTime;
        $scope.minutes = parseInt($scope.minutes, 10);
        $scope.seconds = parseInt($scope.seconds, 10);
        $scope.hours = Math.floor(tempTime/3600);
        tempTime = tempTime - ($scope.hours*3600);
        $scope.minutes = Math.floor(tempTime/60);
        tempTime = tempTime - ($scope.minutes*60);
        $scope.seconds = tempTime;
      };
      $scope.toggleType = function() {
        if ($scope.timerData.type === 'up') {
          $scope.timerData.type = 'down';
        } else {
          $scope.timerData.type = 'up';
        }
      };
      $scope.resetTimer = function() {
        $scope.timerData.currentTime = 0;
        $scope.timerData.baseTime = Date.now();
        $scope.timerData.status = 'off';
        $scope.timeValidator();
      };
      $scope.togglePlayPause = function() {
        if ($scope.timerData.status === 'on') {
          $scope.timerData.status = 'off';
        } else {
          $scope.timerData.status = 'on';
        }
      };
      $scope.timeValidator = function() {
        $scope.calculateHoursMinutesSeconds();
        if (parseInt($scope.minutes, 10) < 10) {
          $scope.minutes = "0" + String($scope.minutes);
        }
        if (parseInt($scope.seconds, 10) < 10) {
          $scope.seconds = "0" + String($scope.seconds);
        }
      };
      $scope.manualTimeChange = function() {
        $scope.timerData.status = 'off';
        var temp = 0;
        temp += parseInt($scope.seconds, 10);
        temp += parseInt($scope.minutes, 10)*60;
        temp += parseInt($scope.hours, 10)*3600;
        $scope.timerData.currentTime = temp;
        // Sync the base time with the new current time
        if ($scope.timerData.type = 'up') {
          $scope.timerData.baseTime = moment().subtract(temp, 'seconds');
        }
      };
      $scope.timeValidator();
    }
  };
}]);
