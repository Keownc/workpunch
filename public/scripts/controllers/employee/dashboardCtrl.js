'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api, Auth, SickLeaveForm){
    $rootScope.form = false;
    $scope.user = {};
    $scope.time = [];
    $scope.employee = [];
    // Return from the Database
    Api.SickLeave.query({},$scope.time, function(data){
        $scope.employee = data;
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

    // Store the users time in the Timecard/punch schema
    $scope.timecard = function() {
        var punchInDay = new Date();;

        Api.Timecard.save({},$scope.time, function(data){
            $scope.time = Api.Timecard.query();
        })
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

    // Adds an profile image
    $scope.avatar = function(files){
        $scope.files = files;
        if(!$scope.files){ return }
        angular.forEach(files, function(file){
            if(file && !file.$error){
                file.upload = $upload.upload({
                    url:"https://api.cloudinary.com/v1_1"+cloudinary.config().cloud_name+"/upload",
                    data:{
                        upload_preset:cloudinary.config().cloud_preset,
                        tags:'myphotoalbum',
                        file: file
                    }
                }).success(function(data, status, headers, config){
                    file_result = data;
                    const avatarUrl = data.url;
                    $scope.avatar = avatarUrl;
                }).error(function (data, status, headers, config) {
                    file_result = data;
                })
            }
        })
    };
});
