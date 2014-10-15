angular.module('rm.navbar', [])


.directive('navbar', ['$state', '$rootScope', function ($state, $rootScope) {
  return {
    templateUrl: 'navbar/navbar.tpl.html',
    replace: true,
    restrict: 'E',
    link: function ($scope, iElement, iAttrs) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.name)) {
          $scope.currentState = toState.name;
        }
      });
      $scope.goLeft = function() {
        if ($scope.currentState === 'home.public' || $scope.currentState === 'home.authenticated') {
          $state.go('createTimer');
        } 
        else if ($scope.currentState === 'createTimer') {
          $state.go('account');
        }
        else {
          $state.go('home');
        }
      };
      $scope.goRight = function() {
        if ($scope.currentState === 'home.public' || $scope.currentState === 'home.authenticated') {
          $state.go('account');
        } 
        else if ($scope.currentState === 'account') {
          $state.go('createTimer');
        }
        else {
          $state.go('home');
        }
      };
    }
  };
}]);
