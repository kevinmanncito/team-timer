angular.module( 'lk.components', [
  'ui.router.state',
  'ia3.data'
])


.directive('sideBar', [function () {
  return {
    templateUrl: 'components/components.sidebarNav.tpl.html',
    replace: true,
    restrict: 'E',
    link: function ($scope, iElement, iAttrs) {
    }
  };
}]);
