angular.module('BS.rooms.room',[
  'ui.router'
])

.controller('roomController',['$scope','$stateParams','$timeout','room',function($scope,$stateParams,$timeout,room){

  $scope.you = {posts:[]};

  $scope.newPost = {};

  $scope.room = room.get($stateParams.roomId);

  $scope.users = room.users.get($stateParams.roomId);

  $scope.posts = room.posts.get($stateParams.roomId);

  $scope.addUser = function(){
    room.users.add($scope.you).then(function(userId){
      $scope.you.id = userId;
      $scope.newPost.userId = userId;
    });
  };

  $scope.addPost = function(formIsValid){
    room.posts.add($scope.you.id,$scope.newPost).then(function(postId){
      $scope.newPost = {userId:$scope.newPost.userId};
    });
  };

}])

.factory('room',['Rooms','Users','Posts',function(Rooms,Users,Posts){

  var room;

  var users;

  var posts;

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

    posts: {
      get: function(roomId) {
        return Posts.get(roomId);
      },
      add: function(userId, post) {
        post.userId = userId;
        return Posts.add(post);
      }
    }
  };

}]);
