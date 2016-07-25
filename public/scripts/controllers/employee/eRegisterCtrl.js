//Employee register page controller
myApp.controller('eRegisterCtrl', function ($scope, $rootScope, $http, $location, Auth) {
    $scope.user = {};

    $scope.registerUser = function(){

        Auth.register($scope.user).then(function(data) {

              $rootScope.current_user = data.user;
              $rootScope.message = "You have successful Register your account. Please login"
              $location.path('/');
        });

    };

    $scope.back = function () {
      $location.path('/');
    };

    $rootScope.navbar = true;
    // $scope.alerts = [
    //    { type: 'danger', msg: 'Sorry that username is taken! please try again' },
    //    { type: 'success', msg: 'You have successful Register your account. Please login' }
    //  ];

});
