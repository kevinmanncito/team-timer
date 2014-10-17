angular.module('rm.data', [])


.provider('Info', [function () {

  this.$get = [function () {
    this.urlRoot = '';
    return {
      urlRoot: this.urlRoot
    };
  }];
}])


.provider('Token', [function() {
  this.token = '';
  this.$get = ['$cookies', '$http', function ($cookies, $http) {
    
    return {
      setToken: function (token) {
        $cookies.token = token;
        this.token = token;
        $http.defaults.headers.common['Authorization'] = 'JWT ' + this.token;
      },
      getToken: function () {
        return this.token;
      }
    };
  
  }];
}])


.provider('Rest', [function () {

  this.$get = ['$q', '$http', function ($q, $http) {
    
    return {
      getTimers: function() {
        var promise = $http.get('/rest/timers').then (function (data) {
          return data;
        });
        return promise;
      },
      getTimer: function(id) {
        var promise = $http.get('/rest/timers/' + id).then (function (data) {
          return data;
        });
        return promise;
      },
      updateTimer: function(id, data) {
        var promise = $http.put('/rest/timers/' + id, data);
        return promise;
      }
    };

  }];
}]);
