//Company register page controller
myApp.controller('cRegisterCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.registerCompany = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            // $rootScope.current_user = data.users.username;
            $location.path('/plan');
        });
    };
    $scope.back = function () {
      $location.path('/register');
    };

});
