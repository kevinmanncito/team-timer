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


.controller('CreateTimerCtrl', [function () {
  var defaultTimer = {

  };
}])


.directive('timer', function() {
  return {
    templateUrl: 'timer/timer.tpl.html',
    replace: true,
    restrict: 'E',
    scope: {
      timerData: '='
    },
    link: function ($scope, iElement, iAttrs) {

    }
  };
});
