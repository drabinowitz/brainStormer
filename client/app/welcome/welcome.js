angular.module('BS.welcome',[])

.controller('welcomeController',['$scope','$timeout','welcome',function($scope,$timeout,welcome){

  $scope.animating = true;

/*  $scope.$on('fade-down:enter',function(){
    $scope.animating = false;
  });*/

  $scope.newRoom = {};

  $timeout(function(){
    $scope.welcomeMessage = 'Welcome to brainStormer!';
  },600);

  $timeout(function(){
    $scope.roomForm = true;
  },900);

  $timeout(function(){
    $scope.animating = false;
  },910);

  $scope.addRoom = function(formIsValid){
    if (formIsValid){
      $scope.loading = true;
      welcome.addRoom({
        name: $scope.newRoom.name,
        idea: $scope.newRoom.idea
      }).then(function(roomId){
        $scope.roomId = roomId;
        $scope.loading = false;
        $scope.newRoom = {};
      });
    }
  };

}])

.factory('welcome',['Rooms',function(Rooms){

  return {

    addRoom: function(room){
      return Rooms.addRoom(room);
    }

  };

}]);
