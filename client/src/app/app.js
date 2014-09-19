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
  'rm.timerCreate',
  'rm.home'
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


.run([function () {

}])


.controller('AppCtrl', [function () {
}]);
