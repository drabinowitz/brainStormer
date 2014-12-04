describe('welcome.js',function(){
  describe('welcome factory',function(){

    var welcome;

    beforeEach(module('BS'));
    beforeEach(inject(function($injector){
      welcome = $injector.get('welcome');
    }));

    it('should be able to add to rooms',function(done){
      welcome.addRoom().then(function(roomId){
        expect(roomId).to.equal('11111');
        done();
      });
    });
  });

  describe('welcomeController',function(){

    var $scope,$rootScope,$timeout,$controller,welcome,createController,mockRoomId;

    beforeEach(module('BS'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $timeout = $injector.get('$timeout');
      $controller = $injector.get('$controller');
      mockRoomId = '11111';
      welcome = {
        addRoom: function(){return {then: function(cb){cb(mockRoomId);}};}
      };

      createController = function(){
        return $controller('welcomeController',{
          $scope:$scope,
          $timeout:$timeout,
          welcome:welcome
        });
      };
    }));

    it('should get the roomId after adding a room',function(done){
      createController();
      $scope.addRoom(true);
      expect($scope.roomId).to.equal(mockRoomId);
      done();
    });
  });

});
