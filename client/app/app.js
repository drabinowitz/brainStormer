angular.module('BS',[
  'ui.router',
  'ngFx',
  'BS.welcome'
])

.config(['$stateProvider','$urlRouterProvider',
function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'app/welcome/welcome.html',
      controller: 'welcomeController'
    });
}]);
