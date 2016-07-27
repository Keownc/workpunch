'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api){
    $rootScope.navbar = false;
    $scope.user = {};
    $scope.times = [];
    $scope.sick = [];
    $scope.employee = [];
    var today = new Date();
   var yearNum = today.getFullYear();
   var monthNum = today.getMonth();
   var dayNum = today.getDate();

   // A function to show total when requested
    $scope.total = function(){
         $scope.total = false;
    }
    // Return from the Database
    //  go into the api factory and get Timecard $https request
    // return the data
    Api.Timecard.query({}, function(data){
        $scope.times = data;
    })
    //  go into the api factory and get SickLeave $https request
    // return the data
    Api.SickLeave.query({}, function(data){
        $scope.sick = data;
    })
    //  go into the api factory and get Employee $https request
    // return the data
    Api.Employee.query({}, function(data){
         $scope.employee = data;
    });

    // Add/Update to the user Database
    $scope.addPost = function(){
        Api.Employee.update({},$scope.user, function(data){
            $scope.employee = Api.Employee.query();
        })
    }
    // Add or update the user images/avatar
    $scope.addAvatar = function(){
        Api.Employee.save({},$scope.user, function(data){
            $scope.employee = Api.Employee.query();
        })
    }
    // Store the users checked in time in the Timecard/ schema with the users employee_id
    $scope.checkIn = function(){
        var employee_id = $scope.employee.employee_id;
            var punchInDay = Date.now();
            var clock_in = punchInDay;
            var month = punchInDay;
            var year = punchInDay;
            var day = punchInDay;
        $http.post('/timecards/timecard', {
            clock_in: clock_in,
            month: month,
            year: year,
            day: day,
            employee_id: employee_id
        }).success(function(data){
            $scope.dateIn=true;
        });
    }
    // Store the users checked out time in the Timecard/ schema with the users employee_id
    $scope.checkOut = function(){
        var punchInDay = Date.now();
        var employee_id = $scope.employee.employee_id;
        var month =punchInDay;
        var year = punchInDay;
        var day = punchInDay;
        var clock_out = punchInDay;
        $http.post('/timecards/timecard', {
            clock_out: clock_out,
            month: month,
            year: year,
            day: day,
            employee_id: employee_id
        }).success(function(data){
            $scope.dateOut=true;
        });
    }
    // Get the Employee time
    // Store to Sick Leave schema
    $scope.sickLeave = function() {
        $scope.submitted = false;
        var employee_id = $scope.employee.employee_id;
        var days_out_sick = $scope.user.days;
        var slip = $scope.employee.file;
        $http.post('/api/sickLeave', {employee_id: employee_id, days_out_sick: days_out_sick, slip:slip}).success(function(data){
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
});
