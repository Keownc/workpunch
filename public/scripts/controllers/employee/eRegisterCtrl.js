//Employee register page controller
myApp.controller('eRegisterCtrl', function ($scope, $rootScope, $http, $location, Auth) {
    $scope.user = {};

    $scope.registerUser = function(){
        // $http.post('/api/register', $scope.user).success(function(data){
        //     $rootScope.authenticated = true;
        //     var username = data.puser.username;
        //
        // });

        Auth.register($scope.user).success(function(data) {
            $location.path('/employeeDashboard');

            // $rootScope.current_user = data.username;
            // var username;
            // username = $rootScope.current_user.replace(/\s+/g, '-').toLowerCase();
            // $location.path('/' + username + '/employeeDashboard');
            //
        });

    };

    $scope.back = function () {
      $location.path('/register');
    };

});
