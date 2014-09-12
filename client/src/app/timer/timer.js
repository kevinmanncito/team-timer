angular.module('rm.timer', [])


.factory('timerSocket', [function() {
  return io.connect('http://localhost:3000');
}])


.directive('timer', [
  '$interval', 
  'timerSocket', 
  'Rest', 
function(
  $interval, 
  timerSocket, 
  Rest
) {
  return {
    templateUrl: 'timer/timer.tpl.html',
    replace: true,
    restrict: 'E',
    scope: {
      timerData: '='
    },
    link: function ($scope, iElement, iAttrs) {
      if (angular.isDefined($scope.timerData._id)) {
        $scope.socket = timerSocket;
        $scope.socket.on('update'+String($scope.timerData._id), function (data){
          $scope.timerData = data;
          $scope.timeValidator();
        });
        $scope.updateAndSave = function() {
          $scope.socket.emit('change', $scope.timerData);
          Rest.updateTimer($scope.timerData._id, $scope.timerData);
        };
      }
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
        } else {
          $scope.timerData.status = 'on';
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
      $scope.timeValidator();
    }
  };
}]);
