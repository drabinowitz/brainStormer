describe('room.js',function(){

  describe('room factory',function(){
    var room;

    beforeEach(module('BS'));
    beforeEach(inject(function($injector){
      room = $injector.get('room');
    }));

    it('should load the relevant data for a room',function(done){
      room.get('11111').then(function(room){
        expect(room.name).to.equal('New Room');
        expect(room.idea).to.equal('New Idea');
        expect(room.users).to.eql([]);
        done();
      });
    });

    it('should add users to a room',function(done){
      room.addUser().then(function(userId){
        expect(userId).to.eql(0);
        done();
      });
    });

  });

  describe('roomController',function(){
    var $scope,$rootScope,$controller,createController,room,mockRoom,mockUser,mockUserId;

    beforeEach(module('BS'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller = $injector.get('$controller');

      mockRoom = {'name':'room','users':[]};
      mockUser = {'name':'user'};
      mockUserId = 0;

      room = {
        get:function(){return {then: function(cb){cb(mockRoom);}};},
        addUser:function(user){
          mockRoom.users.push(user);
          return {then: function(cb){cb(mockUserId);}};
        }
      };

      createController = function(){
        return new $controller('roomController',{
          $scope:$scope,
          room:room
        });
      };

    }));

    it('should get the associated room',function(){
      createController();
      expect($scope.room).to.equal(mockRoom);
    });

    it('should allow adding users',function(){
      createController();
      $scope.newUser = mockUser;
      $scope.addUser();
      expect(mockRoom.users[0]).to.eql(mockUser);
    });

  });

});
