// 'use-strict'
myApp.controller('adminCtrl', function ($scope, $rootScope, $location, Api) {
    $rootScope.navbar = false;
    $scope.company = [];
    $scope.times = [];
    $scope.sick = [];
    $scope.employeeRecords = [];
    // Return from the Database
    // // Return all employees
    Api.Records.query({}, function(data){
        $scope.employeeRecords = data;
    });

    //Return the compant data
    Api.Company.query({}, function(data){
         $scope.company = data;
         console.log("user " + data.username);
    });
});
