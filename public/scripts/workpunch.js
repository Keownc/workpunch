'use-strict'
/**
 * @ngdoc function
 * @name workpunch.controller:registerCtrl
 * @description
 * # registerCtrl
 * Controller of the workPunchApp
 */
const app = angular.module('workpunch', ['ngRoute','ngAnimate', 'ui.bootstrap', 'xeditable', 'angularFileUpload']).run(function($rootScope, $http){
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.logout = function(){
        $http.get('auth/logout');

        $rootScope.authenticated = false;
        $rootScope.current_user = '';
    }
});

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: './views/pages/home.html',
            controller: 'HomeCtrl',
        })
        .when('/register',{
            templateUrl: './views/pages/register.html',
            controller: 'registerCtrl',
            // controllerAs: 'register'
        })
        .when('/eregister',{
            templateUrl: './views/pages/eregister.html',
            controller: 'employeeRCtrl',
        })
        .when('/cregister',{
            templateUrl: './views/pages/cregister.html',
            controller: 'companyRCtrl',
        })
        .when('/dashboard',{
            templateUrl: './views/pages/dashboard.html',
            controller: 'dashboardCtrl',
        })
        .otherwise('/');
});
//Home page controller
app.controller('HomeCtrl',function($scope, $uibModal, $log ){

    $scope.animationsEnabled = true;

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './views/modals/login.html',
            controller: 'HomeModalCtrl'
        });
    }
});
//Home page Modal controller
app.controller('HomeModalCtrl', function($scope, $uibModalInstance, $rootScope, $http, $location) {
    $scope.user = {};
    $scope.error_message = '';

    $scope.login = function () {
        console.log('LOG IN', $scope.user.firstName);
        $http.get('/auth/login', $scope.user).success(function(user){
            $rootScope.authenticated = true;
            if(!user){
                $location.path('/');
            } else {
                $location.path('/dashboard');
            }
        });
        // Auth.login('password', $scope.user, function(err){
        //     $http.post('/auth/login')
        // })
        $uibModalInstance.close();
    }

    $scope.signup = function () {
      $uibModalInstance.close();
      $location.path('/register');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

//register page controller
app.controller('registerCtrl', function ($scope, $rootScope, $http, $location) {

    $scope.employee = function () {
      $location.path('/eregister');
    };

    $scope.company = function () {
      $location.path('/cregister');
    };

});
//Employee register page controller
app.controller('employeeRCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.registerUser = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            if(!user){
                $location.path('/');
            } else {
                $location.path('/dashboard');
            }
        });
    };
    $scope.back = function () {
      $location.path('/register');
    };

});
//Company register page controller
app.controller('companyRCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.registerCompany = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            $rootScope.authenticated = true;
            // $rootScope.current_user = data.users.username;
            $location.path('/plan');
        });
    };
    $scope.back = function () {
      $location.path('/register');
    };

});
//Employee Dashboard page controller
app.controller('dashboardCtrl', function($scope, $http, FileUploader){
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
});


// app.factory('Auth', function Auth($location, $http, $rootScope, $cookieStore, Session, User){
//     $rootScope.current_user = $cookieStore.get('user') || null;
//     $cookieStore.remove('user');
//
//     return {
//         login: function(user, callback){
//             const call_back = callback || angular.noop;
//             Session.save({
//                 username: user.username,
//                 password: user.password
//
//             }.function(user){
//                  $rootScope.current_user = user;
//                  return call_back();
//             });
//         },
//
//         logout: function(callback){
//             const call_back = callback || angular.noop;
//             Session.delete(function(res) {
//                 $rootScope.current_user = null;
//                 return call_back();
//           });
//       },
//
//       createUser: function(userinfo, callback) {
//         const call_back = callback || angular.noop;
//         User.save(userinfo,
//           function(user) {
//             $rootScope.current_user = user;
//             return call_back();
//           },
//           function(err) {
//             return call_back(err.data);
//           });
//       },
//
//       currentUser: function() {
//         Session.get(function(user) {
//           $rootScope.current_user = user;
//         });
//       },
//     }
// });
//
// app.factory('User', function($resource){
//     return $http.get('/api/dashboard/:id', {},
//         {
//             'update' : {
//                 method : 'PUT'
//             }
//         });
// });
//
// app.factory('User', function($resource){
//     return $http.get('/auth/session');
// })
