(function() {
  angular.module('rm.data', [])


  .provider('Info', [function () {

    this.$get = [function () {
      this.urlRoot = TimerConfig.urlRoot;
      this.assetRoot = TimerConfig.assetRoot;
      return {
        urlRoot: this.urlRoot,
        assetRoot: this.assetRoot
      };
    }];
  }])


  .provider('Token', [function() {
    this.$get = [
      '$window', 
      '$state',
    function (
      $window, 
      $state
    ) {
      return {
        setToken: function (token) {
          $window.localStorage.token = token;
        },
        getToken: function () {
          var token = $window.localStorage.token;
          if (angular.isDefined(token)) {
            return token;
          }
          else {
            if (angular.isDefined(token)) {
              this.setToken(token);
              return token;
            }
            else {
              return false;
            }
          }
          return false;
        },
        destroyToken: function () {
          $window.localStorage.removeItem('token');
        },
        logout: function() {
          this.destroyToken();
          $state.go('home');
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
        deleteTimer: function(id) {
          var promise = $http.delete('/rest/timers/' + id);
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
  }])

  .factory('httpInterceptor', [
    '$q', 
    '$window', 
    '$rootScope',
  function(
    $q,
    $window,
    $rootScope
  ) {
    return {
      // optional method
      request: function(config) {
        // do something on success
        var token = $window.localStorage.token;
        if (token) {
          config.headers.Authorization = 'JWT ' + token;
        }
        return config;
      },

      // optional method
      responseError: function(rejection) {
        // do something on error
        if (rejection.status === 403) {
          $window.localStorage.removeItem('token');
          $rootScope.$broadcast('expiredToken', '');
          alert("Your session has expired");
        }
        return $q.reject(rejection);
      }
    };

  }]);

}());