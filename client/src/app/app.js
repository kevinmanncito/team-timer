angular.module( 'lkScaffold', [
  'templates-app',
  'templates-common',
  'lk.home',
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
