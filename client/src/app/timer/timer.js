angular.module('rm.timer', [])


.factory('timerSocket', ['Info', function(Info) {
  return io.connect(Info.urlRoot);
}])


.directive('timer', [
  '$interval',
  '$state',
  'timerSocket', 
  'Rest', 
function(
  $interval, 
  $state,
  timerSocket, 
  Rest
) {
  return {
    templateUrl: 'timer/timer.tpl.html',
    replace: true,
    restrict: 'E',
    scope: {
      timerData: '=',
      isLink: '='
    },
    link: function ($scope, iElement, iAttrs) {
      $scope.goToTimer = function() {
        if ($scope.isLink) {
          $state.go('timerDetail', {timerId: $scope.timerData._id});
        }
      };
      if (angular.isDefined($scope.timerData._id)) {
        $scope.socket = timerSocket;
        $scope.socket.on('update'+String($scope.timerData._id), function (data){
          if (data.status === 'on') {
            $scope.ticker = $interval(tickerLogic, 1000);
          }
          else {
            $interval.cancel($scope.ticker);
            $scope.ticker = undefined;
          }
          $scope.timerData = data;
          $scope.timeValidator();
          $scope.$apply();
        });
      }
      $scope.updateAndSave = function() {
        if (angular.isDefined($scope.timerData._id) && angular.isUndefined($scope.isLink)) {
          $scope.socket.emit('change', $scope.timerData);
          Rest.updateTimer($scope.timerData._id, $scope.timerData);
        }
      };
      // This makes the clock tick
      var tickerLogic = function() {
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
      };

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
        $scope.updateAndSave();
      };
      $scope.resetTimer = function() {
        $scope.timerData.currentTime = 0;
        $scope.timerData.baseTime = Date.now();
        $scope.timerData.status = 'off';
        $scope.timeValidator();
        $scope.updateAndSave();
      };
      $scope.togglePlayPause = function() {
        if ($scope.timerData.status === 'on') {
          $scope.timerData.status = 'off';
          $interval.cancel($scope.ticker);
          $scope.ticker = undefined;
        } else {
          $scope.timerData.status = 'on';
          $scope.ticker = $interval(tickerLogic, 1000);
        }
        $scope.updateAndSave();
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
      $scope.titleOrDescriptionChange = function() {
        $scope.updateAndSave();
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
        } else {
          $scope.timerData.baseTime = moment();
        }
        $scope.updateAndSave();
      };
      $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $interval.cancel($scope.ticker);
        $scope.ticker = undefined;
      });
      $scope.timeValidator();
    }
  };
}]);
