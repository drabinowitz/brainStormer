angular.module('BS.services', ['firebase'])

.factory('Rooms', function($firebase){
  var addRoom = function(roomInfo) {
    var ref = new Firebase('https://resplendent-inferno-1306.firebaseio.com/rooms');
    var sync = $firebase(ref);
    var rooms = sync.$asArray();

    return rooms.$add(roomInfo)
    .then(function(newChildRef) {
      return newChildRef.$id;
    })
    .catch(function(data) {
      console.log('IN THE CATCH')
      console.error(data)
    })
  };

  return {
    addRoom: addRoom
  };
})