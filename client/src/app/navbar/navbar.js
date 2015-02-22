(function() {
  angular.module('rm.navbar', [])


  .directive('navbar', [
    '$state', 
    '$rootScope', 
    '$location', 
    'Token', 
  function (
    $state, 
    $rootScope, 
    $location, 
    Token
  ) {
    return {
      templateUrl: 'navbar/navbar.tpl.html',
      replace: true,
      restrict: 'E',
      link: function ($scope, iElement, iAttrs) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          if (angular.isDefined(toState.name)) {
            $scope.currentState = toState.name.split('.')[0];
          }
        });

        $scope.goToState = function(state) {
          if (state === 'home' && $location.path().split('/')[1] !== 'home') {
            $state.go('home');
          } 
          else if (state === 'account' && $location.path().split('/')[1] !== 'account') {
            $state.go('account');
          }
        };

        $scope.goLeft = function() {
          if ($scope.currentState === 'home') {
            $state.go('createTimer');
          } 
          else if ($scope.currentState === 'createTimer') {
            $scope.goToState('account');
          }
          else {
            $scope.goToState('home');
          }
        };
        
        $scope.goRight = function() {
          if ($scope.currentState === 'home') {
            $scope.goToState('account');
          } 
          else if ($scope.currentState === 'account') {
            $state.go('createTimer');
          }
          else {
            $scope.goToState('home');
          }
        };
      }
    };
  }]);
}());