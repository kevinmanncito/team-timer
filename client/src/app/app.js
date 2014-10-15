angular.module( 'rmTimer', [
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.route',
  'btford.socket-io',
  'ngCookies',
  'rm.data',
  'rm.navbar',
  'rm.timer',
  'rm.timerDetail',
  'rm.timerCreate',
  'rm.home',
  'rm.account'
])


.config([
  '$urlRouterProvider',
  'InfoProvider',
function (
  $urlRouterProvider,
  InfoProvider
) {
  $urlRouterProvider.otherwise( '/home' );
  InfoProvider.urlRoot = TimerConfig.urlRoot;
}])


.run(['$cookies', 'Token', function ($cookies, Token) {
  if ($cookies.jwt) {
    Token.setToken($cookies.jwt);
  }
}])


.controller('AppCtrl', [function () {
}]);
