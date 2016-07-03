myApp.controller('HomeCtrl',function($scope, $uibModal, $log, $rootScope ){
    $rootScope.form = false;
    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './views/modals/login.html',
            size: size,
            controller: 'homeModalCtrl'
        });
    }
});
