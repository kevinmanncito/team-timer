angular.module( 'rm.account', [])


.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state( 'account', {
    url: '/account',
    views: {
      'main': {
        controller: 'AccountCtrl',
        templateUrl: 'account/account.tpl.html'
      }
    }
  });

  $stateProvider.state( 'account.public', {
    url: '/public',
    views: {
      "sub": {
        controller: 'AccountPublicCtrl',
        templateUrl: 'account/accountPublic.tpl.html'
      }
    },
    resolve: {
      'users': ['Rest', function (Rest) {
        return 'users';
      }]
    }
  });

  $stateProvider.state( 'account.authenticated', {
    url: '/authenticated',
    views: {
      "sub": {
        controller: 'AccountAuthenticatedCtrl',
        templateUrl: 'account/accountAuthenticated.tpl.html'
      }
    },
    resolve: {
      'users': ['Rest', function(Rest) {
        return Rest.getUsers();
      }]
    }
  });
}])


.controller( 'AccountCtrl', [
  '$scope', 
  '$state', 
  'Token', 
function (
  $scope, 
  $state, 
  Token
) {
  if (Token.getToken()) {
    $state.go('account.authenticated');
  } 
  else {
    $state.go('account.public');
  }
}])


.controller( 'AccountAuthenticatedCtrl', ['$scope', function ($scope) {
}])


.controller( 'AccountPublicCtrl', ['$scope', 'Rest', function ($scope, Rest) {
  $scope.createUser = function() {
    var data = {'email': $scope.email, 'password': $scope.password};
    Rest.createUser(data).then(function (res) {
      console.log(res);
    });
  };
}]);
