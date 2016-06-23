//Employee register page controller
myApp.controller('eRegisterCtrl', function ($scope, $rootScope, $http, $location, Auth) {
    $scope.user = {};

    $scope.registerUser = function(){
        // $http.post('/api/register', $scope.user).success(function(data){
        //     $rootScope.authenticated = true;
        //     if(!user){
        //         $location.path('/');
        //     } else {
        //         $location.path('/employee/dashboard');
        //     }
        // });

        Auth.register($scope.user).success(function(data) {
            if (data.error) {
                toastr.error(data.error);
            } else {
                $location.path('/employee/dashboard');
            }
        });

    };
    $scope.back = function () {
      $location.path('/register');
    };

});
