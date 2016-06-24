myApp.factory('Auth', function Auth($location, $http, $rootScope, Session, Api){

    return {
        login: function(user, callback){
            return $http.post('/auth/login', user);
        },

        register: function(user, callback) {
            return $http.post('/auth/employee-signup', user);
        },
        currentUser: function() {
            Session.get(function(user) {
                $rootScope.current_user = user;
            });
        }
        // login: function(provider, user, callback) {
        //   var cb = callback || angular.noop;
        //   Session.save({
        //     username: user.username,
        //     password: user.password,
        //   }, function(user) {
        //     $rootScope.currentUser = user;
        //     return cb();
        //   }, function(err) {
        //     return cb(err.data);
        //   });
        // },
        //
        // logout: function(callback) {
        //   var cb = callback || angular.noop;
        //   Session.delete(function(res) {
        //       $rootScope.currentUser = null;
        //       return cb();
        //     },
        //     function(err) {
        //       return cb(err.data);
        //     });
        // },

    }
});


  myApp.factory('Session', function ($resource) {
    return $resource('/auth/employee-login/');
  });
