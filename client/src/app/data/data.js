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
  this.$get = ['$window', '$http', '$state', function ($window, $http, $state) {
    
    return {
      setToken: function (token) {
        $window.localStorage.token = token;
        this.token = token;
        $http.defaults.headers.common['Authorization'] = 'JWT ' + this.token;
      },
      getToken: function () {
        if (angular.isDefined(this.token)) {
          return this.token;
        }
        else {
          if (angular.isDefined($window.localStorage.token)) {
            this.setToken($window.localStorage.token);
            return this.token;
          }
          else {
            return false;
          }
        }
        return false;
      },
      destroyToken: function () {
        this.token = '';
        $window.localStorage.removeItem('token');
        delete $http.defaults.headers.common['Authorization'];
      },
      logout: function() {
        this.destroyToken();
        $state.go('home.public');
      }
    };
  
  }];
}])


.provider('Rest', [function () {

  this.$get = [
    '$q', 
    '$http', 
    '$state', 
    'Token', 
  function (
    $q, 
    $http, 
    $state, 
    Token
  ) {
    return {
      getTimers: function() {
        var promise = $http.get('/rest/timers').then(function (data) {
          return data;
        });
        return promise;
      },
      getTimer: function(id) {
        var promise = $http.get('/rest/timers/' + id).then(function (data) {
          return data;
        });
        return promise;
      },
      updateTimer: function(id, data) {
        var promise = $http.put('/rest/timers/' + id, data);
        return promise;
      },
      createUser: function(data) {
        var promise = $http.post('/rest/users/', data).then(function (data) {
          return data;
        });
        return promise;
      },
      login: function(data) {
        var promise = $http.post('/rest/tokens/', data).then(function (data) {
          return data;
        });
        return promise;
      }
    };

  }];
}]);
