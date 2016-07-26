'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api, Auth, SickLeaveForm){
    $rootScope.navbar = false;
    $scope.user = {};
    $scope.times = [];
    $scope.sick = [];
    $scope.employee = [];
    // Return from the Database
    Api.Timecard.query({}, function(data){
        $scope.times = data;
    })
    Api.SickLeave.query({}, function(data){
        $scope.sick = data;
    })
    Api.Employee.query({}, function(data){
         $scope.employee = data;
         console.log("user " + data.username);
    });

    // Add/Insert to the user Database
    $scope.addPost = function(){
        Api.Employee.update({},$scope.user, function(data){
            $scope.employee = Api.Employee.query();
        })
    }
    $scope.addAvatar = function(){
        Api.Employee.save({},$scope.user, function(data){
            $scope.employee = Api.Employee.query();
        })
    }
    var today = new Date();
   var yearNum = today.getFullYear();
   var monthNum = today.getMonth();
   var dayNum = today.getDate();
    // Store the users time in the Timecard/punch schema

    // Enable after an 8 hours
    setTimeout(function(){
        $scope.dateIn = false;
    }, 60*60*1000*8)
    $scope.checkIn = function(){
        var employeeID = $scope.employee.employeeID;
            var punchInDay = Date.now();
            var clockIn = punchInDay;
            var month = punchInDay;
            var year = punchInDay;
            var day = punchInDay;
        $http.post('/api/timecard', {
            clockIn: clockIn,
            month: month,
            year: year,
            day: day,
            employeeID: employeeID
        }).success(function(data){
            $scope.dateIn=true;
        });
    }
    $scope.checkOut = function(){
        var punchInDay = Date.now();
        var employeeID = $scope.employee.employeeID;
        var month =punchInDay;
        var year = punchInDay;
        var day = punchInDay;
        var clockOut = punchInDay;
        $http.post('/api/timecard', {
            clockOut: clockOut,
            month: month,
            year: year,
            day: day,
            employeeID: employeeID
        }).success(function(data){
            $scope.dateOut=true;
        });
    }
    // Get the Employee time
    // Store to Sick Leave schema
    $scope.sickLeave = function() {
        $scope.submitted = false;
        $http.post('/api/sickLeave', $scope.user).success(function(data){
            $scope.submitted = true;
        });
    }
    $scope.sickLeaveForm = function () {
       $scope.submitted = false;
    };
    $scope.editName = function () {
        $scope.updateName = true;
    }
    $scope.editUser = function () {
        $scope.updateUser = true;
    }
    $scope.editID = function () {
        $scope.updateID = true;
    }
    $scope.editEmail = function () {
        $scope.updateEmail = true;
    }
    $scope.back = function() {
        $scope.updateName = false;
        $scope.updateUser = false;
        $scope.updateID = false;
        $scope.updateEmail = false;
    }
    // Option for Sick Leave days, Overtime Rate and Overtime hours
    $scope.options = {
        time: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24, 25, 26, 27, 28, 29, 30
        ],
        rate: [
            1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6
        ]
    };
    // Sick Leave form submit
    $scope.sickLeaveSubmit = function () {
        const uploadUrl = '/upload';
        SickLeaveForm.post(uploadUrl, $scope.user)
    };
});
