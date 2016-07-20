'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api, Auth, SickLeaveForm){
    $rootScope.form = false;
    $scope.user = {};
    $scope.time = [];
    $scope.sick = [];
    $scope.employee = [];
    // Return from the Database
    Api.Timecard.query({},$scope.time, function(data){
        $scope.time = data;
    })
    Api.SickLeave.query({},$scope.time, function(data){
        $scope.sick = data;
    })
    Api.Employee.query({}, function(data){
         $scope.employee = data;
        //   $scope.firstName = data.data;
         console.log("user " + data.username);
    });

    // Add/Insert to the user Database
    $scope.addPost = function(){
        Api.Employee.update({},$scope.user, function(data){
            $scope.employee = Api.Employee.query();
        })
    }
    var today = new Date();
   var yearNum = today.getFullYear();
   var monthNum = today.getMonth();
   var dayNum = today.getDate();
    // Store the users time in the Timecard/punch schema
    $scope.checkIn = function() {
        var punchInDay = Date.now();
        var clockIn = punchInDay;
        var month = monthNum;
        var year = yearNum;
        var day = dayNum;
        var employeeID = $scope.employee.employeeID;
        $http.post('/api/timecard', {
            clockIn: clockIn,
            month: monthNum,
            year: yearNum,
            day: dayNum,
            employeeID: employeeID
        }).success(function(data){
            // Disable after sumbit
            $scope.checked = true;
            // Enable after an 8 hours
            setTimeout(function(){
                $scope.checked = false;
            }, 60*60*1000*8)
            // $scope.time = Api.Timecard.query();
        });
    }
    // 28800
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

    // Adds an sick leave slip image
    $scope.upload = function(files){
        $scope.files = files;
        if(!$scope.files){ return }
        angular.forEach(files, function(file){
            if(file && !file.$error){
                file.upload = $upload.upload({
                    url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                    data:{
                        upload_preset:cloudinary.config().cloud_preset,
                        tags:'myphotoalbum',
                        file: file
                    }
                }).success(function(data, status, headers, config){
                    file.result = data;
                    const imageUrl = data.url;
                    $scope.slip = imageUrl;
                }).error(function (data, status, headers, config) {
                    file.result = data;
                })
            }
        })
    };

});
