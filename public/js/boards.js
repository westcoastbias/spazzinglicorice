angular.module('boards', ['services'])

.controller('BoardsController', function ($scope, $window, $location, Auth) {
  $scope.data = {};
  $scope.getBoards = function () {
    Auth.signin($scope.data)
      .then(function (token) {
        $window.localStorage.setItem('com.collaboardrate', token);
        $window.location = '/boards';
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});