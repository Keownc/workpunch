'use-strict'

const myApp = angular.module('workpunch', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'xeditable',
    'ngCookies',
    'ds.clock',
    // 'cloudinary ',
    'ngFileUpload'
]);

myApp.run(function($rootScope, $http, $location, Auth){

    // $rootScope.$watch('currentUser', function(current_user) {
    //     if (!current_user && (['/', '/logout', '/employeeRegister'].indexOf($location.path()) == -1 )) {
    //         Auth.currentUser();
    //       }
    // });
    // $rootScope.$on('event:auth-loginRequired', function() {
    //     $location.path('/login');
    //     return false;
    // });
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

// myApp.config(['cloudinaryProvider', function (cloudinaryProvider) {
//     cloudinaryProvider
//         .set('cloud_name','dbqouy9xa')
//         .set('upload_preset', 'vzjnjauc')
//
// }]);
