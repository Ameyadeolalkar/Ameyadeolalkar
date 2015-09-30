angular.module('authService', [])

// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================
.factory('Auth', function($http, $scope) {

  // create auth factory object
  var authFactory = {};

  // log a user in
  authFactory.login = function(email, password) {

    // return the promise object and its data
    return $http.post('/api/login',$scope.user) {
      email : email,
      password: password
    })
      .success(function(data,status) {
        console.log(status)
        return data;
      });

authFactory.logout = function(){
  $http.post('/logout')
}

authFactory.isLoggedIn = function(){
  
}

  }
  };


