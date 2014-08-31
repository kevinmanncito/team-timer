angular.module( 'rmTimer', [
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.route',
  'rm.navbar',
  'btford.socket-io',
  'rm.timer',
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
