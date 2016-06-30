'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api, Auth, SickLeaveForm){
    $rootScope.form = false;
    $scope.user = {};
    $scope.employee = {};
    // Return from the Database
    Api.Employee.query({}, function(data){
         $scope.employee = data;
         console.log("firstname " + $scope.employee.firstName);
    });

    $scope.refresh =function(){
        $http.get('/api/employeeDashboard/').success(function(data){
             $scope.firstName = data.data.firstName;
            console.log("company" + $scope.user.company);
        })
    }

    // Add/Insert to the user Database
    $scope.addPost = function(){
        Api.Employee.save({},$scope.user, function(data){
            // $scope.user.push(data);
            $scope.employee = Api.Employee.query();
        })
    }

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



    // Sick leave form days option
    $scope.options = {
        days: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24, 25, 26, 27, 28, 29, 30
        ]
    };

    // Sick Leave form submit
    $scope.sickLeaveSubmit = function () {
        const uploadUrl = '/upload';
        SickLeaveForm.post(uploadUrl, $scope.user)
    }

});
