'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api){
    $rootScope.navbar = false;
    $scope.tabs= true;
    $scope.user = {};
    $scope.times = [];
    $scope.sick = [];
    $scope.employee = [];
    const today = new Date();
   const yearNum = today.getFullYear();
   const monthNum = today.getMonth();
   const dayNum = today.getDate();

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
        Api.Employee.save({},$scope.user.avatar, function(data){
            $scope.employee = Api.Employee.query();
        })
    }
    // Store the users checked in time in the Timecard/ schema with the users employee_id
    $scope.checkIn = function(){
        const employee_id = $scope.employee.employee_id;
            const punchInDay = Date.now();
            const clock_in = punchInDay;
            const month = punchInDay;
            const year = punchInDay;
            const day = punchInDay;
        $http.post('/timeCardApi/timecard', {
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
        const punchInDay = Date.now();
        const employee_id = $scope.employee.employee_id;
        const month =punchInDay;
        const year = punchInDay;
        const day = punchInDay;
        const clock_out = punchInDay;
        $http.post('/timeCardApi/timecard', {
            clock_out: clock_out,
            month: month,
            year: year,
            day: day,
            employee_id: employee_id
        }).success(function(data){
            $scope.dateOut=true;
        });
    }
    // A function to get the value form the modify request form to store the data
    $scope.modify = function () {
        const punchInDay = Date.now();
        const employee_id = $scope.employee.employee_id;
        const current_date = punchInDay;
        const get_date = $scope.modify.get_date;
        const new_time = $scope.modify.new_time;
        const request = $scope.modify.request;
        const description = $scope.modify.description;
        $http.post('/timeCardApi/employeeRequest', {
            new_time: new_time,
            current_date: current_date,
            get_date: get_date,
            request: request,
            employee_id: employee_id,
            description: description
        }).success(function(data){
            $scope.modifyForm = true;
        });
    }
    // Get the Employee time
    // Store to Sick Leave schema
    $scope.sickLeave = function() {
        $scope.submitted = false;
        const employee_id = $scope.employee.employee_id;
        const days_out_sick = $scope.user.days;
        const slip = $scope.user.file;
        $http.post('/sickLeaveApi/sickLeave', {
            employee_id: employee_id,
            days_out_sick: days_out_sick,
            slip:slip
        }).success(function(data){
            $scope.submitted = true;
        });
    }

    // Get the user number and date for the notification to be send
    $scope.nofity = function () {
        const timeZone = Date.now();
        const first_name = $scope.employee.first_name;
        const last_name = $scope.employee.last_name;
        const phone_number = $scope.user.phone_number;
        const notification = $scope.user.notification;
        const time_zone = timeZone;
        const time = $scope.user.time;
        $http.post('/alert/appointments', {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            notification: notification,
            time_zone: time_zone,
            time: time
        }).success(function(data){
            $scope.note = true;
        })
    }
    // hide the Sick leave form after submitted
    $scope.sickLeaveForm = function () {
       $scope.submitted = false;
    };
    // Show the edit Name form
    $scope.editName = function () {
        $scope.updateName = true;
    }
    // Show the edit Username form
    $scope.editUser = function () {
        $scope.updateUser = true;
    }
    // Show the update email form
    $scope.editEmail = function () {
        $scope.updateEmail = true;
    }
    // Go back to the Account edit setting
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
        ],
        text: ['checkIn', 'checkOut']
    };


});
