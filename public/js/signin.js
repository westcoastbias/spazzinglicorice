angular.module('signin', ['services'])

.controller('SigninController', function ($scope, $window, $location, Auth, Boards) {
  $scope.user = {};
  $scope.data = [];
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function () {
        $scope.getBoards($scope.user);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.getBoards = function () {
    Boards.getAll()
      .then(function (data) {
        if ( data.length === 0) {
          $scope.newBoard();
        } else {
          $window.location = '/boards';
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

 $scope.newBoard = function () {
   Boards.getNew()
     .then(function (data) {
       $window.location = '/' + data;
     })
     .catch(function (error) {
       console.error(error);
     });
 }; 

});