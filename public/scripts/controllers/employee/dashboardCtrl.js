'use-strict'
//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, $rootScope, $route, Api, FileUploader, SickLeaveForm){

    $scope.user = {};
    $scope.employee = [];
    // Return from the Database
    Api.Employee.query({}, function(data){

         $scope.employee = data;
         //
         console.log("company " + data.user);
    });


    // $scope.refresh =function(){
    //     $http.get('/employee/dashboard/').success(function(data){
    //          $scope.user = data;
    //         console.log("company" + $scope.user.company);
    //     })
    // }

    // Add/Insert to the user Database
    $scope.addPost = function(){
        $scope.user.name = $rootScope.firstName + $rootScope.lastName;
        Api.Employee.save({},$scope.user, function(data){
            // $scope.user.push(data);
            $scope.employee = Api.Employee.query();
        })
    }


    // Adds an profile image
    $scope.avater = function(){
        $scope.response = JSON.parse()
    };
    // $scope.uploader = new FileUploader({
    //       url: 'upload.php'
    //   });
    // $scope.uploader = new FileUploader();

    const uploader = $scope.uploader = new FileUploader({
                url: 'upload.php'
            });

            // FILTERS

            uploader.filters.push({
                name: 'customFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    return this.queue.length < 10;
                }
            });

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
