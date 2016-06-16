// 'use-strict'
// const app = angular.module('workpunch');

myApp.controller('registerCtrl', function ($scope, $rootScope, $http, $location) {

    $scope.employee = function () {
      $location.path('/employeeRegister');
    };

    $scope.company = function () {
      $location.path('/companyRegister');
    };

});
