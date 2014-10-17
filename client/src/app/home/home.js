angular.module( 'rm.home', [])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    }
  });

  $stateProvider.state( 'home.public', {
    url: '/recent-timers',
    views: {
      "sub": {
        controller: 'HomePublicCtrl',
        templateUrl: 'home/homePublic.tpl.html'
      }
    },
    resolve: {
      'timers': ['Rest', function(Rest) {
        return Rest.getTimers();
      }]
    }
  });

  $stateProvider.state( 'home.authenticated', {
    url: '/dashboard',
    views: {
      "sub": {
        controller: 'HomeAuthenticatedCtrl',
        templateUrl: 'home/homeAuthenticated.tpl.html'
      }
    },
    resolve: {
      'timers': ['Rest', function(Rest) {
        return Rest.getTimers();
      }]
    }
  });
}])


.controller( 'HomeCtrl', ['$scope', 'Token', '$state', function ($scope, Token, $state) {
  if (Token.getToken()) {
    $state.go('home.authenticated');
  } 
  else {
    $state.go('home.public');
  }
}])


.controller( 'HomeAuthenticatedCtrl', ['$scope', 'Token', 'timers', function ($scope, Token, timers) {
  $scope.timers = timers.data;
}])


.controller( 'HomePublicCtrl', ['$scope', 'Token', 'timers', function ($scope, Token, timers) {
  $scope.timers = timers.data;
}]);
