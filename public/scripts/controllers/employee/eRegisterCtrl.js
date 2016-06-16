//Employee register page controller
myApp.controller('eRegisterCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.registerUser = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            if(!user){
                $location.path('/');
            } else {
                $location.path('/employee/dashboard');
            }
        });
    };
    $scope.back = function () {
      $location.path('/register');
    };

});
