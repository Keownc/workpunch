myApp.factory('Api',['$resource', function($resource){
    return {
        Employee: $resource('/api/employee/dashboard/:id', {id: '@id'})
    }
}])
