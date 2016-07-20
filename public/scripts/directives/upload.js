'use-strict'
myApp.directive('fileUpload', ['$parse', function($parse){
    function(scope, element, attrs){
            // scope.file = attrs.file;
            var onChange = $parse(attrs.fileUpload);
            var assign = model.assign;

            element.on('change', function (event) {
                scope.$apply(function () {
                    assign(scope, element[0].file[0])
                })
            })
        }
}])
