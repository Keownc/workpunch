// 'use-strict'
myApp.controller('adminCtrl', function ($scope, $rootScope, $http, $location, Auth, Api) {
    $rootScope.navbar = false;
    $scope.user = {};
    $scope.company = [];
    $scope.times = [];
    $scope.sick = [];
    $scope.employeeRecords = [];
    // Return from the Database
    // // Return all employees
    Api.Records.query({}, function(data){
        $scope.employeeRecords = data;
    });

    // Return employees time
    Api.Timecard.query({}, function(data){
        $scope.times = data;
    });
    // Return employee sick
    Api.SickLeave.query({}, function(data){
        $scope.sick = data;
    });
    //Return the compant data
    Api.Company.query({}, function(data){
         $scope.company = data;
        //   $scope.firstName = data.data;
         console.log("user " + data.username);
    });
});
