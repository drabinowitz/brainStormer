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
      welcome.addRoom($scope.newRoom.name,$scope.newRoom.idea).then(function(roomId){
        $scope.roomId = roomId;
      $timeout(function(){
          $scope.loading = false;
          $scope.newRoom = {};
        },3000);
      });
    }
  };

}])

.factory('welcome',['$timeout',function($timeout){

  var roomId = '11111';

  return {

    addRoom: function(){
      return {
        then: function(cb){
          cb(roomId);
        }
      };
    }

  };

}]);
