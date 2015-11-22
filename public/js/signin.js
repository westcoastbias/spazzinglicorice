angular.module('signin', ['services'])

.controller('SigninController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function () {
        // $window.localStorage.setItem('com.collaboardrate', token);
        $window.location = '/boards';
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});