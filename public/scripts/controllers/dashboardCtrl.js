//Employee Dashboard page controller
myApp.controller('dashboardCtrl', function($scope, $http, FileUploader){
    $scope.avater = function(){
        $scope.response = JSON.parse()
    };
    // $scope.uploader = new FileUploader({
    //       url: 'upload.php'
    //   });
      $scope.uploader = new FileUploader();

    $scope.user = {
        name: 'Keown Creese',
        company: 'Work Punch',
        position: 'Developer',
        description: 'sdf'
    }
    $scope.refresh =function(){
        $http.get().success(function(data){

        })
    }
    $scope.edit = function(){
        $http.get().success(function(data){
            $scope.company = data;
        })
    }
    $scope.update = function () {
        // $http.put('/')
    }

});
