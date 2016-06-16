myApp.controller('HomeCtrl',function($scope, $uibModal, $log ){

    $scope.animationsEnabled = true;

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './views/modals/login.html',
            controller: 'homeModalCtrl'
        });
    }
});
