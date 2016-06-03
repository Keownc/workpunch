'use-strict'
/**
 * @ngdoc function
 * @name workpunch.controller:registerCtrl
 * @description
 * # registerCtrl
 * Controller of the workPunchApp
 */
const app = angular.module('workpunch', ['ngRoute','ngAnimate', 'ui.bootstrap']).run(function($rootScope, $http){
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.logout = function(){
        $http.get('auth/logout');

        $rootScope.authenticated = false;
        $rootScope.current_user = '';
    }
});

app.config(function($routeProvider){
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
        .when('/eregister',{
            templateUrl: './views/pages/eregister.html',
            controller: 'employeeRCtrl',
        })
        .when('/cregister',{
            templateUrl: './views/pages/cregister.html',
            controller: 'companyRCtrl',
        })
        .when('/dashboard',{
            templateUrl: './views/pages/dashboard.html',
            controller: 'dashboardCtrl',
        })
        .otherwise('/');
});

app.controller('HomeCtrl',function($scope, $uibModal, $log ){

    $scope.animationsEnabled = true;

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './views/modals/login.html',
            controller: 'HomeModalCtrl'
        });
    }
});

app.controller('HomeModalCtrl', function($scope, $uibModalInstance, $rootScope, $http, $location) {
    $scope.user = {};
    $scope.error_message = '';

    $scope.login = function () {
        console.log('LOG IN', $scope.user);
        $http.post('/auth/login', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            // $rootScope.current_user = data.users.username;
            $location.path('/dashboard');
        });
        $uibModalInstance.close();
    }

    $scope.ok = function () {
        console.log("OKAY!!")
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      $location.path('/register');
    };
});


app.controller('registerCtrl', function ($scope, $rootScope, $http, $location) {

    $scope.employee = function () {
      $location.path('/eregister');
    };

    $scope.company = function () {
      $location.path('/cregister');
    };

});

app.controller('employeeRCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.registerUser = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            // $rootScope.current_user = data.users.username;
            $location.path('/dashboard');
        });
    };
    $scope.back = function () {
      $location.path('/register');
    };

});

app.controller('companyRCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.registerCompany = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            // $rootScope.current_user = data.users.username;
            $location.path('/plan');
        });
    };
    $scope.back = function () {
      $location.path('/register');
    };

});

app.controller('dashboardCtrl', function($scope, $http){

});
