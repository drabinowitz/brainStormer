angular.module('BS.services', ['firebase'])

.factory('Rooms', function($firebase){
  var addRoom = function(roomInfo) {
    var ref = new Firebase('https://resplendent-inferno-1306.firebaseio.com/rooms');
    var sync = $firebase(ref);
    var rooms = sync.$asArray();

    return rooms.$add(roomInfo)
    .then(function(newChildRef) {
      return newChildRef.key();
    })
    .catch(function(data) {
      console.error(data);
    });
  };

  var getRoom = function(roomId) {
    var ref = new Firebase('https://resplendent-inferno-1306.firebaseio.com/rooms/' + roomId);
    var room = $firebase(ref).$asObject();

    return room;
  };

  return {
    addRoom: addRoom,
    getRoom: getRoom
  };
})

.factory('Users', function($firebase) {
  var addUser = function(userInfo, roomId) {
    var ref = new Firebase('https://resplendent-inferno-1306.firebaseio.com/rooms/' + roomId + '/users');
    var sync = $firebase(ref);
    var users = sync.$asArray();

    return users.$add(userInfo)
    .then(function(newChildRef) {
      return newChildRef.key();
    })
    .catch(function(data) {
      console.error(data);
    });
  };

  var getUser = function(roomId, userId) {
    var ref = new Firebase('https://resplendent-inferno-1306.firebaseio.com/rooms/'+ roomId + 'users/' + userId);
    var user = $firebase(ref).$asObject();

    return user;
  };

  return {
    addUser: addUser,
    getUser: getUser
  };
})