myApp.factory('Auth', function Auth($location, $http, $rootScope, Session, Api){

    return {
        login: function(user, callback){
            return $http.post('/api/login', user);
        },

        register: function(user, callback) {
            return $http.post('/api/register', user);
        },
        currentUser: function() {
            Session.get(function(user) {
                $rootScope.current_user = user;
            });
        }
    }
});


  myApp.factory('Session', function ($resource) {
    return $resource('/api/employee-login/');
  });
