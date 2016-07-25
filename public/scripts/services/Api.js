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
        Timecard: $resource('/api/timecard', {employeeID: '@employeeID'}, { 'update': {method: 'PUT'}}),

        SickLeave: $resource('/api/sickLeave', {employeeID: '@employeeID'}),

        Company: $resource('/api/companyDashboard', {id: '@id'},
        { 'get':    {method:'GET'},
        'save':   {method:'POST'},
        'query':  {method:'GET'},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'},
        'update': {method: 'PUT'}
        }),
        Records: $resource('/api/employeeRecords', {companyID: '@companyID'})
    }
}])
