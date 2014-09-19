angular.module('rm.data', [])


.provider('Info', [function () {

  this.$get = [function () {
    this.urlRoot = '';
    return {
      urlRoot: this.urlRoot
    };
  }];
}])


.provider('Rest', [function () {

  this.$get = ['$q', '$http', function ($q, $http) {
    this.getTimers = function() {
      var promise = $http.get('/rest/timers').then (function (data) {
        return data;
      });
      return promise;
    };
    this.getTimer = function(id) {
      var promise = $http.get('/rest/timers/' + id).then (function (data) {
        return data;
      });
      return promise;
    };
    this.updateTimer = function(id, data) {
      var promise = $http.put('/rest/timers/' + id, data);
      return promise;
    };
    return {
      getTimers: this.getTimers,
      getTimer: this.getTimer,
      updateTimer: this.updateTimer
    };
  }];
}]);
