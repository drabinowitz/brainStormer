angular.module('BS.rooms.room',[
  'ui.router'
])

.controller('roomController',['$scope','$stateParams','$timeout','room',function($scope,$stateParams,$timeout,room){

  $scope.you = {posts:[]};

  $scope.newPost = {};

  $scope.room = room.get($stateParams.roomId);

  $scope.addUser = function(){
    room.addUser($scope.you).then(function(userId){
      $scope.you.id = userId;
    });
  };

  $scope.addPost = function(formIsValid){
    room.addPost($scope.you.id,$scope.newPost).then(function(postId){
      $scope.newPost = {};
    });
  };

}])

.factory('room',['Rooms',function(Rooms){

/*  var room = {

    name: 'New Room',
    idea: 'New Idea',
    users: []

  };*/

  return {
    get:function(roomId){
      return Rooms.getRoom(roomId);
    },

    addUser:function(user){
      room.users.push(user);
      return {
        then: function(cb){
          cb(room.users.length-1);
        }
      };
    },

    addPost:function(userId,post){
      room.users[userId].posts.push(post);
      return {
        then: function(cb){
          cb(room.users[userId].posts.length-1);
        }
      };
    }

  };

}]);
