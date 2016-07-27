// 'use-strict'
myApp.controller('companyCtrl', function ($scope, $rootScope, $http, $location, Auth) {
    $scope.user = {};
    $scope.error_message = '';
    $scope.error = {};
    $scope.employee = [];
    $rootScope.current_user = '';
    // Run function to login a user and get their data
    $scope.Login = function(){
        Auth.companyLogin($scope.user).then(function(data) {
            // If successful redirect to dashboard
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        $location.path('/companyDashboard');

        })
    }
    $scope.back = function () {
      $location.path('/');
    };
    $rootScope.navbar = true;
});
