//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, FileUploader, $rootScope, Api, $route){

    $scope.user = {
        name: '',
        company: '',
        position: '',
        description: ''
    };
    $scope.employee = [];

    Api.Employee.query({}, function(data){
        // console.log(data.user.company);
         $scope.employee = data;
         //
         console.log("company " + data.user);
    });
    // console.log(Api.Employee.query());

    $scope.refresh =function(){
        $http.get('/employee/dashboard/').success(function(data){
             $scope.user = data;
            console.log("company" + $scope.user.company);
        })
    }
    //Add to the user Database
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
      $scope.uploader = new FileUploader();

    $scope.options = {
        days: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24, 25, 26, 27, 28, 29, 30
        ]
    };

});
