'use-strict'
const app = angular.module('workpunch', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: ma
        })
})
app.controller('authController',function($scope){

    $scope.newuser = {username: '', password: '', company: '' };
    $scope.error_message = '';

    $scope.login = function () {
        $scope.error_message = 'Login in request for' + $scope.newuser.username;
    }

    $scope.register = function () {
        $scope.error_message = 'Login in request for' + $scope.newuser.username;
    }

});
