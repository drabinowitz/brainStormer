angular.module('BS',[
  'ui.router',
  'ngFx',
  'BS.services',
  'BS.welcome',
  'BS.rooms.room'
])

.config(['$stateProvider','$urlRouterProvider',
function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'app/welcome/welcome.html',
      controller: 'welcomeController'
    })
    .state('rooms', {
      url: '/rooms',
      abstract: true,
      template:'<div ui-view></div>'
    })
    .state('rooms.room', {
      url: '/:roomId',
      templateUrl: 'app/rooms/room/room.html',
      controller: 'roomController'
    });
}]);
