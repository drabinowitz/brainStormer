angular.module('BS.rooms.room',[
  'ui.router'
])

.controller('roomController',['$scope','$stateParams','room',function($scope,$stateParams,room){

  $scope.newUser = {};

  room.get($stateParams.roomId).then(function(room){
    $scope.room = room;
  });

  $scope.addUser = function(){
    room.addUser($scope.newUser);
  };

}])

.factory('room',[function(){

  var room = {

    name: 'New Room',
    idea: 'New Idea',
    users: []

  };

  return {
    get:function(){
      return {
        then: function(cb){
          cb(room);
        }
      };
    },

    addUser:function(user){
      room.users.push(user);
      return {
        then: function(cb){
          cb(room.users.length-1);
        }
      };
    }

  };

}]);
