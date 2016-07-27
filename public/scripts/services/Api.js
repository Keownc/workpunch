myApp.factory('Api',['$resource', function($resource){
    // Get the data/ resource from the api routes
    return {
        Employee: $resource('/api/employeeDashboard/', {id: '@id'},
        { 'get':    {method:'GET'},
        'save':   {method:'POST'},
        'query':  {method:'GET'},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'},
        'update': {method: 'PUT'}
        }),
        Timecard: $resource('/timeCardApi/timecard', {employeeID: '@employee_ID'}, { 'update': {method: 'PUT'}}),

        SickLeave: $resource('/sickLeaveApi/sickLeave', {employeeID: '@employee_ID'}),

        Company: $resource('/admin/companyDashboard', {id: '@id'},
        { 'get':    {method:'GET'},
        'save':   {method:'POST'},
        'query':  {method:'GET'},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'},
        'update': {method: 'PUT'}
        }),
        Records: $resource('/api/employeeRecords', {companyID: '@company_ID'})
    }
}])
