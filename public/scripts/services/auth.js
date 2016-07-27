myApp.factory('Auth', function Auth($location, $http, $rootScope, Session, Api){

    return {
        login: function(user, callback){
            return $http.post('/auth/login', user);
        },

        register: function(user, callback) {
            return $http.post('/api/register', user);
        },
        companyLogin: function(user, callback){
            return $http.post('/auth/login-company', user);
        },
        companyR: function(user, callback){
            return $http.post('/admin/companyRegister', user);
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
