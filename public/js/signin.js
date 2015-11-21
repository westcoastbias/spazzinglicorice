angular.module('signin', [])

.controller('SigninController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.signin = function () {
    console.log('in the signin controller signin method');
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.collaboardrate', token);
        $location.path('/signin');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});