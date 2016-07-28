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
    'ngAutodisable',
    'ngFileUpload'
]);

myApp.run(function($rootScope, $http, $location, Auth){

    $rootScope.current_user = '';
    $rootScope.authenticated = false;
    $rootScope.message = '';
    // A function to get the log out route and deserialize the User
    $rootScope.logout = function(){
        $http.get('/api/logout').success(function (data) {
            $location.path('/');
        });
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
        .when('/companyLogin',{
            templateUrl: './views/pages/login.html',
            controller: 'companyCtrl',
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
        .when('/companyDashboard',{
            templateUrl: './views/pages/company/dashboard.html',
            controller: 'adminCtrl',
        })
        .otherwise('/');

        $locationProvider
            .html5Mode({enabled:true, requireBase: false})
}]);
