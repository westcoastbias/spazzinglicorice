angular.module('services', [])

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    console.log('services signin method executing with user ' + JSON.stringify(user));
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (resp) {
      // console.log('token is ' + resp.data.token);
      console.log('user is logged in');
      // return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.collaboardrate');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.collaboardrate');
    $location.path('/signin');
  };


  return {
    signin: signin,
    isAuth: isAuth,
    signout: signout
  };
});