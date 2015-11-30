angular.module('signin', ['services'])

.controller('SigninController', function ($scope, $window, $location, Auth, Boards) {
  $scope.user = {};
  $scope.data = [];
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function () {
        // $window.localStorage.setItem('com.collaboardrate', token);
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
          $scope.data.boards = data;
          $window.location = '/boards';
          console.log('$scope.data is ' + $scope.data.boards) 
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.getBoardsOnce = function () {
    Boards.getAll()
      .then(function (data) {
          $scope.data.boards = data;
          console.log('$scope.data is ' + $scope.data.boards) 
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

 // $scope.getBoardsOnce();

});