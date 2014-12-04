angular.module('BS.welcome',[])

.controller('welcomeController',['$scope','$timeout','welcome',function($scope,$timeout,welcome){

  $scope.animating = true;

/*  $scope.$on('fade-down:enter',function(){
    $scope.animating = false;
  });*/

  $scope.newRoom = {};

  $timeout(function(){
    $scope.welcomeMessage = 'Welcome to brainStormer!';
  },100);

  $timeout(function(){
    $scope.roomForm = true;
  },400);

  $timeout(function(){
    $scope.animating = false;
  },400);

  $scope.addRoom = function(formIsValid){
    if (formIsValid){
      $scope.loading = true;
      welcome.addRoom($scope.newRoom.name,$scope.newRoom.idea).then(function(roomId){
        $scope.roomId = roomId;
        $scope.loading = false;
        $scope.newRoom = {};
      });
    }
  };

}])

.factory('welcome',[function(){

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
