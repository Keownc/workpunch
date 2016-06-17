myApp.factory('Api',['$resource', function($resource){
    return {
        Employee: $resource('/api/employee/dashboard/:id', {id: '@id'},
        { 'get':    {method:'GET'},
          'save':   {method:'POST'},
          'query':  {method:'GET'},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'}
      })
    }
}])
