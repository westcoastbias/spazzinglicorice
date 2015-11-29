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
})

.factory('Boards', function ($http) {

  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/getBoards'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getNew = function () {
    return $http({
      method: 'GET',
      url: '/new'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAll: getAll,
    getNew: getNew
  };

});