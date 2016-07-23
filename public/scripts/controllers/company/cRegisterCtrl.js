//Company register page controller
myApp.controller('cRegisterCtrl', function ($scope, $rootScope, $http, $location) {
    $rootScope.form = true;
    $scope.user = {};

    $scope.registerCompany = function(){
        $http.post('/api/companyRegister', $scope.user).success(function(data){
            // $rootScope.authenticated = true;
            // $rootScope.current_user = data.users.username;
            $location.path('/');
        });
    };
    $scope.back = function () {
      $location.path('/');
    };

});
