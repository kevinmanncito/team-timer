angular.module('rm.navbar', [])


.directive('navbar', function() {
  return {
    templateUrl: 'navbar/navbar.tpl.html',
    replace: true,
    restrict: 'E',
    link: function ($scope, iElement, iAttrs) {
    }
  };
});
