//Company register page controller
myApp.controller('cRegisterCtrl', function ($scope, $location, $rootScope, Auth) {
    $rootScope.navbar = true;
    $scope.user = {};
// Run a function to call the api/company register route to add a new user to the data base
    $scope.registerCompany = function(){
        Auth.companyRegister($scope.user).then(function(data) {
            $location.path('/');

        });
    };
    $scope.back = function () {
      $location.path('/');
    };

});
