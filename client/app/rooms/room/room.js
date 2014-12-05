angular.module('BS.rooms.room',[
  'ui.router'
])

.controller('roomController',['$scope','$stateParams','$timeout','room',function($scope,$stateParams,$timeout,room){

  $scope.you = {posts:[]};

  $scope.newPost = {};

  $scope.upvoted = {};

  $scope.room = room.get($stateParams.roomId);

  $scope.users = room.users.get($stateParams.roomId);

  $scope.posts = room.posts.get($stateParams.roomId);

  $scope.votes = room.votes.get($stateParams.roomId);

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

  $scope.addVote = function(postId) {
    room.votes.add($scope.you.id, postId).then(function(voteId) {
      $scope.upvoted = { postId: true };
    });
  };

}])

.factory('room',['Rooms','Users','Posts','Votes',function(Rooms,Users,Posts,Votes){

  var room,
      users,
      posts,
      vote;

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
    },

    votes: {
      get: function(roomId) {
        return Votes.get(roomId);
      },
      add: function(userId, postId) {
        vote.userId = userId;
        vote.postId = postId;
        return Votes.add(vote);
      }
    }
  };

}]);
