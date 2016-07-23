// 'use-strict'
myApp.controller('companyCtrl', function ($scope, $rootScope, $http, $location, Auth) {
    $scope.user = {};
    $scope.error_message = '';
    $scope.error = {};
    $scope.employee = [];
    $rootScope.current_user = ''
    $scope.login = function(){
        Auth.company($scope.user).then(function(data) {
            // If successful redirect to dashboard
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        console.log(data.username);
        // console.log("current User "+$rootScope.current_user.firstName);
        $location.path('/companyDashboard');


        })
    }
});
