'use-strict'

const myApp = angular.module('workpunch', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'xeditable',
    'angularFileUpload',
    'ngResource',
    'ngRoute'
]);

myApp.run(function($rootScope, $http){
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.firstName = '';
    $rootScope.lastName = '';
    $rootScope.logout = function(){
        $http.get('auth/logout');

        $rootScope.authenticated = false;
        $rootScope.current_user = '';
    }
});

myApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider ){
    $routeProvider
        .when('/',{
            templateUrl: './views/pages/home.html',
            controller: 'HomeCtrl',
        })
        .when('/register',{
            templateUrl: './views/pages/register.html',
            controller: 'registerCtrl',
            // controllerAs: 'register'
        })
        .when('/employeeRegister',{
            templateUrl: './views/pages/employee/register.html',
            controller: 'eRegisterCtrl',
        })
        .when('/employeeDashboard',{
            templateUrl: './views/pages/employee/dashboard.html',
            controller: 'dashboardCtrl',
        })
        .when('/companyRegister',{
            templateUrl: './views/pages/company/register.html',
            controller: 'cRegisterCtrl',
        })
        .otherwise('/');

        $locationProvider
            .html5Mode({enabled:true, requireBase: false})
}]);


//Home page controller




// app.factory('Auth', function Auth($location, $http, $rootScope, $cookieStore, Session, User){
//     $rootScope.current_user = $cookieStore.get('user') || null;
//     $cookieStore.remove('user');
//
//     return {
//         login: function(user, callback){
//             const call_back = callback || angular.noop;
//             Session.save({
//                 username: user.username,
//                 password: user.password
//
//             }.function(user){
//                  $rootScope.current_user = user;
//                  return call_back();
//             });
//         },
//
//         logout: function(callback){
//             const call_back = callback || angular.noop;
//             Session.delete(function(res) {
//                 $rootScope.current_user = null;
//                 return call_back();
//           });
//       },
//
//       createUser: function(userinfo, callback) {
//         const call_back = callback || angular.noop;
//         User.save(userinfo,
//           function(user) {
//             $rootScope.current_user = user;
//             return call_back();
//           },
//           function(err) {
//             return call_back(err.data);
//           });
//       },
//
//       currentUser: function() {
//         Session.get(function(user) {
//           $rootScope.current_user = user;
//         });
//       },
//     }
// });
//
// app.factory('User', function($resource){
//     return $http.get('/api/dashboard/:id', {},
//         {
//             'update' : {
//                 method : 'PUT'
//             }
//         });
// });
//
// app.factory('User', function($resource){
//     return $http.get('/auth/session');
// })
