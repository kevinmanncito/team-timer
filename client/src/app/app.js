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

.factory('timerSocket', ['Info', function(Info) {
  return io.connect(Info.urlRoot);
}])


.factory('$moment', ['Info', '$window', function(Info, $window) {
  return $window.moment;
}])


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
