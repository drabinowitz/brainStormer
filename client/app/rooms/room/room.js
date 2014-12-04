angular.module('BS.rooms.room',[
  'ui.router'
])

.controller('roomController',['$scope','$stateParams','$timeout','room',function($scope,$stateParams,$timeout,room){

  $scope.you = {posts:[]};

  $scope.newPost = {};

  $scope.room = room.get($stateParams.roomId);

  $scope.users = room.users.get($stateParams.roomId);

  $scope.addUser = function(){
    room.users.add($scope.you).then(function(userId){
      $scope.you.id = userId;
    });
  };

  $scope.addPost = function(formIsValid){
    room.addPost($scope.you.id,$scope.newPost).then(function(postId){
      $scope.newPost = {};
    });
  };

}])

.factory('room',['Rooms','Users',function(Rooms,Users){

  var room;

  var users;

  return {
    get:function(roomId){
      room = Rooms.getRoom(roomId);
      return room;
    },

    users: {
      get:function(roomId){
        return Users.get(roomId);
      },
      add:function(user){
        return Users.add(user);
      }
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
