angular.module('BS.welcome',[])

.controller('welcomeController',['$scope','welcome',function($scope,welcome){

  $scope.newRoom = {};

  $scope.addRoom = function(formIsValid){
    if (formIsValid){
      welcome.addRoom($scope.newRoom.name).then(function(roomId){
        $scope.roomId = roomId;
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
