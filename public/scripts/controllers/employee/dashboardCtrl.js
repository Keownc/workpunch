'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api, Auth, SickLeaveForm){
    $rootScope.form = false;
    $scope.user = {};
    $scope.time = {};
    $scope.employee = [];
    // Return from the Database
    Api.Employee.query({}, function(data){
         $scope.employee = data;
         //  $scope.firstName = data.data;
        //  console.log("company" + data.user.company);
    });

    // Add/Insert to the user Database
    $scope.addPost = function(){
        Api.Employee.save({},$scope.user, function(data){
            $scope.user.push(data);
            // $scope.employee = Api.Employee.query();
        })
    }

    // Store the users time in the Timecard/punch schema
    $scope.timecard = function() {
        Api.Timecard.save({},$scope.time, function(data){
            $scope.employee = Api.Timecard.query();
        })
    }
    // Get the Employee time
    // Store to Sick Leave schema
    $scope.timecard = function() {
        // Api.SickLeave.save({},$scope.time, function(data){
        //     $scope.employee = Api.SickLeave.query();
        // })
            $http.get('/api/sickLeave').success(function(data){
                $scope.employee = data;
            })
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
