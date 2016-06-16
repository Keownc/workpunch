// 'use-strict'
// const app = angular.module('workpunch');

myApp.controller('registerCtrl', function ($scope, $rootScope, $http, $location) {

    $scope.register = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/dashboard');
        });
    };

    $scope.employee = function () {
      $location.path('/eregister');
    };

    $scope.company = function () {
      $location.path('/cregister');
    };

});
