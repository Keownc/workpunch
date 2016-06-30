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

    $scope.loadAuth = function() {
        Auth.load().success(function(data) {
            $scope.employee = data.user;
             $location.path('/employeeDashboard');
        });
    }

    $scope.login = function () {

        Auth.login($scope.user).success(function(data) {
            // If successful redirect to dashboard
            // $scope.employee = Api.Employee.query();
            // var username = $scope.employee.username;
            // username = username.replace(/\s+/g, '-').toLowerCase();
            // $location.path('/' + username + '/employeeDashboard');
             $location.path('/employeeDashboard');
            $uibModalInstance.close();

		}).error(function(err) {
          // If any errors redirect back to homepage
          console.log('Authentication unsuccessful!', err);
          $location.path('/');
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
