//Home page Modal controller
myApp.controller('homeModalCtrl', function($scope, $uibModalInstance, $rootScope, $http, $location, Auth) {
    $scope.user = {};
    $scope.error_message = '';
    $scope.error = {};
    $scope.employee = [];
    $rootScope.current_user = ''
// A function to login in the employee
    $scope.login = function () {
// get the login route from the Auth factory 
        Auth.login($scope.user).then(function(data) {
            // If successful redirect to dashboard
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        console.log(data.username);
        // console.log("current User "+$rootScope.current_user.firstName);
        $location.path('/employeeDashboard');
        $uibModalInstance.close();

		})
    }
// Dismiss or close model
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
// Go to employee Register page
    $scope.signup = function () {
      $location.path('/employeeRegister');
       $uibModalInstance.close();
    };
// Go to company register page
    $scope.company = function () {
      $location.path('/companyRegister');
       $uibModalInstance.close();
    };
    // Go to Company Login page
    $scope.companyLogin = function(){
        $location.path('/companyLogin');
         $uibModalInstance.close();
    }

});
