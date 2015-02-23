(function() {
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
      url: '/sign-up',
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
      url: '/settings',
      views: {
        "sub": {
          controller: 'AccountAuthenticatedCtrl',
          templateUrl: 'account/accountAuthenticated.tpl.html'
        }
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


  .controller( 'AccountAuthenticatedCtrl', [
    '$scope', 
    '$state', 
    'Token', 
  function (
    $scope, 
    $state, 
    Token
  ) {
    $scope.logout = function() {
      Token.logout();
    };
  }])


  .controller( 'AccountPublicCtrl', [
    '$scope',
    '$state', 
    'Rest', 
    'Token', 
  function (
    $scope, 
    $state,
    Rest, 
    Token
  ) {
    $scope.createUser = function() {
      var data = {'email': $scope.email, 'password': $scope.password};
      Rest.createUser(data).then(function (res) {
        Token.setToken(res.data.token);
        $state.go('home.authenticated');
      }, function (err) {
        $scope.signupError = err.data;
      });
    };
    $scope.login = function() {
      var data = {'email': $scope.emailLogin, 'password': $scope.passwordLogin};
      Rest.login(data).then(function (res) {
        Token.setToken(res.data.token);
        $state.go('account.authenticated');
      }, function (err) {
        $scope.loginError = err.data;
      });
    };
  }]);
}());