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
}])

.controller('AuthController', ['$scope', 'Auth', function($scope, Auth){
  $scope.login = {};
  $scope.newLogin = function() {
    Auth.login(function(error,authData){
      $scope.login.username = authData.github.username;
    });
  };

  $scope.$watch('login',function(newVal){
    $scope.$broadcast('loggedIn',newVal.username);
  },true);

}])

.factory('Auth', ['$firebase', function($firebase){
  var ref = new Firebase('https://resplendent-inferno-1306.firebaseio.com');

  var login = function(cb) {
    ref.authWithOAuthPopup("github",cb,
    {
      remember: "sessionOnly"
    });
  };

  return {
    login: login
  };
}]);
