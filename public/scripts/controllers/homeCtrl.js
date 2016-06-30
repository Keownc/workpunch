myApp.controller('HomeCtrl',function($scope, $uibModal, $log, $rootScope ){
    $rootScope.form = false;
    $scope.animationsEnabled = true;

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './views/modals/login.html',
            controller: 'homeModalCtrl'
        });
    }
});
