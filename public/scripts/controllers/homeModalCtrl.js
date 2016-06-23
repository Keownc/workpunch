//Home page Modal controller
myApp.controller('homeModalCtrl', function($scope, $uibModalInstance, $rootScope, $http, $location, Auth) {
    $scope.user = {};
    $scope.error_message = '';

    $scope.login = function () {
        // $http.post('/auth/login', $scope.user).success(function(user){
        //     $rootScope.authenticated = true;
        //
        //     $location.path('/employeeDashboard');
        //     $uibModalInstance.close();
        // }).error(function(err) {
        //   // If any errors redirect back to homepage
        //   $location.path('/');
        // })

        $scope.loadAuth = function() {
        		Auth.load().success(function(data) {
        			$scope.user = data.user;
                     $location.path('/employee/dashboard');
        		});
        	}

            Auth.login($scope.user).success(function(data) {
                 $location.path('/employee/dashboard');
    			// if (data.error) {
    			// 	toastr.error(data.error);
                //     // $location.path('/');
    			// } else {
    			// 	$scope.loadAuth();
                //      $location.path('/employee/dashboard');
    			// }
    		});


    }

    $scope.signup = function () {
      $uibModalInstance.close();
      $location.path('/register');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});
