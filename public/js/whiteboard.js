// # Whiteboard Angular Components

// ##### [Back to Table of Contents](./tableofcontents.html)

// Initialize the whiteboard module.

angular.module('whiteboard', ['ui.router'])
  .config(function($stateProvider) {
    $stateProvider
      .state('eraser', {
        controller: 'toolbar'
      });
  })
  // Set App to the root scope. 
  .controller('canvas', function($rootScope, $scope, tools) {
    $rootScope.app = App;
  })

// Set toolbar for colour palette and eraser. 
.controller('toolbar', function($scope, $element, tools) {
  $scope.changePen = function(option) {
    tools.changePen(option);
    console.log("The user chose the tool", $element);
    $('input').not($('#' + option)).attr('checked', false);
  };
  $scope.clearBoard = function() {
    tools.clearBoard();
  }
})

// Set changePen method.
// Note that an eraser is simply a white pen, not actually erasing [x,y] tuples from the database. 
.service('tools', function($rootScope) {
  var changePen = function(option) {
    if (option === 'eraser') {
      console.log("The user is using the eraser.");
      $rootScope.app.pen.lineWidth = 50;
      $rootScope.app.pen.strokeStyle = '#fff';
      // olive color communicates that the text box 'pen' has been selected, refactor later to be more clear when working on CSS
    } else if (option === 'olive') {
      console.log("The user is using text.");
      $rootScope.app.pen.lineWidth = 5;
      $rootScope.app.pen.strokeStyle = 'olive';
    } else {
      console.log("The user is using the pen.");
      $rootScope.app.pen.lineWidth = 5;
      $rootScope.app.pen.strokeStyle = option;
    }
  };
  var clearBoard = function() {
    App.socket.emit('clear');
  };
  return {
    changePen: changePen,
    clearBoard: clearBoard
  };

});
