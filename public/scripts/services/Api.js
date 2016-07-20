myApp.factory('Api',['$resource', function($resource){
    return {
        Employee: $resource('/api/employeeDashboard/', {id: '@id'},
        { 'get':    {method:'GET'},
          'save':   {method:'POST'},
          'query':  {method:'GET'},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'},
          'update': {method: 'PUT'}
      }),

      Timecard: $resource('/api/timecard', {id: '@id'}, {'query':  {method:'GET'}}),

      SickLeave: $resource('/api/sickLeave', {id: '@id'}, {'query':  {method:'GET'}})
    }
}])
