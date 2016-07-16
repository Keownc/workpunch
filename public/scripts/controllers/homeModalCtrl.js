//Home page Modal controller
myApp.controller('homeModalCtrl', function($scope, $uibModalInstance, $rootScope, $http, $location, Auth, Session, $cookieStore, Api) {
    $scope.user = {};
    $scope.error_message = '';
    $scope.error = {};
    $scope.employee = [];
    $rootScope.current_user = $cookieStore.get('user') || null;

    Api.Employee.query({}, function(data){
         $scope.employee = data;
    });

    // $scope.loadAuth = function() {
    //     Auth.load().success(function(data) {
    //         $scope.employee = data.user;
    //         //  $location.path('/employeeDashboard');
    //     });
    // }

    $scope.login = function () {

        Auth.login($scope.user).success(function(data) {
            // If successful redirect to dashboard
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user;
        // console.log("current User "+$rootScope.current_user.firstName);
        $location.path('/employeeDashboard');
        $uibModalInstance.close();


		})
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.signup = function () {
      $location.path('/employeeRegister');
       $uibModalInstance.close();
    };

    $scope.company = function () {
      $location.path('/companyRegister');
       $uibModalInstance.close();
    };

});
