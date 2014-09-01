angular.module( 'rmTimer', [
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.route',
  'btford.socket-io',
  'rm.data',
  'rm.navbar',
  'rm.timer',
  'rm.timerDetail',
  'rm.home'
])


.config([
  '$urlRouterProvider',
function (
  $urlRouterProvider
) {
  $urlRouterProvider.otherwise( '/home' );
}])


.run([function () {
}])


.controller('AppCtrl', [function () {
}]);
