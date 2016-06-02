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
            controllerAs: 'register'
        })
        .when('/feature',{
            templateUrl: './views/pages/feature.html',
            controller: 'authController',
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
    $scope.user = {username: '', password: '', company: '' };
    $scope.error_message = '';

    $scope.user = function () {
        $scope.newuser;
    }

    $scope.login = function () {
        console.log('LOG IN', $scope.user);
        $http.post('/auth/login', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
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
    };
})
