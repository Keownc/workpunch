'use-strict'
const app = angular.module('workpunch', []);

app.controller('authController',function($scope){
    $scope.newuser = {username: '', password: '', company: '' };
    $scope.error_message = '';

    postService.getAll().success(function(data) {
        $scope.posts = data;
    })
    $scope.login = function () {
        $scope.error_message = 'Login in request for' + $scope.newuser.username;
    }
});
