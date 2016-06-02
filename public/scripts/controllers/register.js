'use-strict'
const app = angular.module('workpunch');

app.controller('registerCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {username: '', password: '', company: '', email: '', employeeID: '', firstName: '', lastName: '' };

    $scope.register = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/dashboard');
        });
    };

});
