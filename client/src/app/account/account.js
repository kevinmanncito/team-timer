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
}])


.controller( 'AccountCtrl', ['$scope', function ($scope) {
}]);
