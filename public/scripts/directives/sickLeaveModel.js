'use-strict'
myApp.directive('sickLeaveModel', ['$parse', function($parse){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            // scope.file = attrs.file;
            var model = $parse(attrs.fileModel);
            var assign = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    assign(scope, element[0].file[0])
                })
            })
        }
    }
}])
