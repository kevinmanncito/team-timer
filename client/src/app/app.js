angular.module( 'rmTimer', [
  'templates-app',
  'templates-common',
  'rm.navbar',
  'rm.timer',
  'rm.home',
  'ui.router.state',
  'ui.route'
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
