(function() {
  angular.module( 'rmTimer', [
    'templates-app',
    'templates-common',
    'ui.router.state',
    'btford.socket-io',
    'angular-jwt',
    'rm.data',
    'rm.navbar',
    'rm.timer',
    'rm.timerDetail',
    'rm.timerCreate',
    'rm.home',
    'rm.account'
  ])

  .factory('timerSocket', ['Info', '$window', function (Info, $window) {
    return $window.io.connect(Info.urlRoot);
  }])


  .factory('$moment', ['$window', function ($window) {
    return $window.moment;
  }])


  .config([
    '$urlRouterProvider',
    '$httpProvider',
    'InfoProvider',
  function (
    $urlRouterProvider,
    $httpProvider,
    InfoProvider
  ) {
    $urlRouterProvider.otherwise( '/home' );
    $httpProvider.interceptors.push('httpInterceptor');
  }])


  .controller('AppCtrl', [
    '$rootScope', 
    '$state', 
    'Info', 
  function (
    $rootScope, 
    $state, 
    Info
  ) {
    $rootScope.assetRoot = Info.assetRoot;
    $rootScope.$on('expiredToken', function (event, data) {
      $state.go('home');
    });
  }]);
}());