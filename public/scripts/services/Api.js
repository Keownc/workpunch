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
        Timecard: $resource('/timeCardApi/timecard', {employee_id: '@employee_id'}, { 'update': {method: 'PUT'}}),

        SickLeave: $resource('/sickLeaveApi/sickLeave', {employee_id: '@employee_id'}),

        Company: $resource('/admin/companyDashboard', {id: '@id'},
        { 'get':    {method:'GET'},
        'save':   {method:'POST'},
        'query':  {method:'GET'},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'},
        'update': {method: 'PUT'}
        }),
        Records: $resource('/api/employeeRecords', {company_id: '@company_id'})
    }
}])
