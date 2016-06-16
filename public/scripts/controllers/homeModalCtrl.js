//Home page Modal controller
myApp.controller('homeModalCtrl', function($scope, $uibModalInstance, $rootScope, $http, $location) {
    $scope.user = {};
    $scope.error_message = '';

    $scope.login = function () {
        console.log('LOG IN', $scope.user.firstName);
        $http.get('/auth/login', $scope.user).success(function(user){
            $rootScope.authenticated = true;
            if(!user){
                $location.path('/');
            } else {
                $location.path('/employeeDashboard');
            }
        });
        // Auth.login('password', $scope.user, function(err){
        //     $http.post('/auth/login')
        // })
        $uibModalInstance.close();
    }

    $scope.signup = function () {
      $uibModalInstance.close();
      $location.path('/register');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});
