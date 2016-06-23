// myApp.factory('authentication',['$http', '$window', function($http, $window){
// myApp.factory('Auth', function Auth($location, $http, $rootScope, $cookieStore, Session, User){
myApp.factory('Auth', function( $http){
    // $rootScope.current_user = $cookieStore.get('user') || null;
    // $cookieStore.remove('user');

    return {
	    load: function() {
			return $http.get('/api/employee/dashboard');
		},
	    logout: function() {
			return $http.get('/auth/logout');
		},
		login: function(inputs) {
			return $http.post('/auth/login', inputs);
		},
		register: function(inputs) {
			return $http.post('/auth/employee-signup', inputs);
		}
	}
});
//

// return {
//     login: function(user, callback){
//         const call_back = callback || angular.noop;
//         Session.save({
//             username: user.username,
//             password: user.password
//
//         }.function(user){
//              $rootScope.current_user = user;
//              return call_back();
//         });
//     },
//
//     logout: function(callback){
//         const call_back = callback || angular.noop;
//         Session.delete(function(res) {
//             $rootScope.current_user = null;
//             return call_back();
//       });
//   },
//
//   createUser: function(userinfo, callback) {
//     const call_back = callback || angular.noop;
//     User.save(userinfo,
//       function(user) {
//         $rootScope.current_user = user;
//         return call_back();
//       },
//       function(err) {
//         return call_back(err.data);
//       });
//   },
//
//   currentUser: function() {
//     Session.get(function(user) {
//       $rootScope.current_user = user;
//     });
//   },
// }
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
