//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, FileUploader, $rootScope, Api){

    $scope.user = {
        name: '',
        company: '',
        position: '',
        description: ''
    };
    $scope.employee = [];

    Api.Employee.query({}, function(data){
        return $scope.user = data;
    });

    $scope.refresh =function(){
        $http.get().success(function(data){

        })
    }
    //Add to the user Database
    $scope.addPost = function(){
        $scope.user.name = $rootScope.firstName + $rootScope.lastName;
        Api.Employee.save({"company": $scope.user.company},$scope.user, function(data){
            $scope.employee.push(data);
        })
    }
    //Edit the to user Database information
    $scope.edit = function(){
        $http.get('/employee/dashboard/').success(function(data){

        })
    }
    //Update the to user Database information
    $scope.update = function () {
        // $http.put('/')
    }

    // Adds an profile image
    $scope.avater = function(){
        $scope.response = JSON.parse()
    };
    // $scope.uploader = new FileUploader({
    //       url: 'upload.php'
    //   });
      $scope.uploader = new FileUploader();

});
