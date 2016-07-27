myApp.controller('HomeCtrl',function($scope, $uibModal, $log, $rootScope ){
    $rootScope.navbar = false;
    $scope.animationsEnabled = true;
// A function to bring up the model
    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './views/modals/login.html',
            size: size,
            controller: 'homeModalCtrl'
        });
    }
});
