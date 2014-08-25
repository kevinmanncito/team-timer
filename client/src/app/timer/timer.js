angular.module('rm.timer', [
  'ui.router.state'
])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'timer', {
    url: '/timer',
    views: {
      'main': {
        controller: 'TimerCtrl',
        templateUrl: 'timer/timerPage.tpl.html'
      }
    }
  });
}])


.controller('TimerCtrl', [function () {
}])


.directive('timer', function() {
  return {
    templateUrl: 'timer/timer.tpl.html',
    replace: true,
    restrict: 'E',
    link: function ($scope, iElement, iAttrs) {
    }
  };
});
