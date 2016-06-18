'use-strict'
myApp.service('SickLeaveForm', ['$http', function($http){
    this.post = function(uploadUrl, data){
        const slip_file = new FormData();
        for(var key in data){
            slip_file.append(key, data[key])
        }
        $http.post(uploadUrl, slip_file, {
            transformRequest: angular.indentity
            // header: {'content-type': undefined}
        })
    }
}])
