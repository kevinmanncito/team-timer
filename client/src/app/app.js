angular.module( 'rmTimer', [
  'templates-app',
  'templates-common',
  'ui.router.state',
  'btford.socket-io',
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
  'InfoProvider',
function (
  $urlRouterProvider,
  InfoProvider
) {
  $urlRouterProvider.otherwise( '/home' );
}])


.run(['Token', function (Token) {
  Token.getToken();
}])


.controller('AppCtrl', ['$rootScope', 'Info', function ($rootScope, Info) {
  $rootScope.assetRoot = Info.assetRoot;
}]);
