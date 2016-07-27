// 'use-strict'
myApp.controller('companyCtrl', function ($scope, $rootScope, $http, $location, Auth) {
    $scope.user = {};
    $scope.employee = [];
    $rootScope.current_user = '';
    $rootScope.navbar = true;
    // Run function to login a user and get their data
    $scope.Login = function(){
        Auth.companyLogin($scope.user).then(function(data) {
            // If successful redirect to dashboard
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        $location.path('/companyDashboard');

        })
    }

});
