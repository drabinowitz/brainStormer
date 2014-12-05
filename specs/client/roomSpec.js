describe('room.js',function(){

  describe('room factory',function(){
    var room,Rooms,Users,mockRoom,mockUsers,mockUser,mockPost;

    beforeEach(module('BS'));
    beforeEach(function(){

      mockRoom = {
        name:'name',
        idea:'test'
      };

      mockUsers = [];

      mockUser = {'name':'test'};

      Rooms = {
        getRoom:function(roomId){
          return mockRoom;
        }
      };

      Users = {
        get:function(roomId){
          return mockUsers;
        },
        add:function(user){
          mockUsers.push(user);
          return {
            then:function(cb){
              cb(mockUsers.length-1);
            }
          };
        }
      };

      module(function($provide){
        $provide.value('Rooms',Rooms);
        $provide.value('Users',Users);
      });
    });

    beforeEach(inject(function($injector){
      room = $injector.get('room');

      mockPost = {'body':'text'};
    }));

    it('should load the relevant data for a room',function(){
      expect(room.get()).to.equal(mockRoom);
    });

    it('should load users in a room',function(){
      expect(room.users.get()).to.equal(mockUsers);
    });

    it('should add users to a room',function(done){
      var users = room.users.get();
      room.users.add(mockUser).then(function(userId){
        expect(users[userId]).to.eql(mockUser);
        done();
      });
    });

    xit('should add posts for a user',function(done){
      room.addUser(mockUser).then(function(userId){
        room.addPost(userId,mockPost).then(function(postId){
          expect(postId).to.eql(0);
          room.get('11111').then(function(room){
            expect(room.users[userId].posts[postId]).to.eql(mockPost);
            done();
          });
        });
      });
    });

  });

  describe('roomController',function(){
    var $scope,$rootScope,$controller,createController,room,mockRoom,mockUsers,mockUser,mockPost;

    beforeEach(module('BS'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller = $injector.get('$controller');

      mockRoom = {'name':'room'};
      mockUsers = [];
      mockUser = {'name':'user'};
      mockPost = {'body':'test'};

      room = {
        get:function(){return mockRoom;},
        users:{
          get:function(roomId){
            return mockUsers;
          },
          add:function(user){
            mockUsers.push(user);
            return {then: function(cb){cb(mockUsers.length-1);}};
          }
        },
        addPost:function(userId,post){
          mockRoom.users[userId].posts.push(post);
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
      $scope.you = mockUser;
      $scope.addUser();
      expect($scope.users[0]).to.eql(mockUser);
    });

    it('should allow adding posts',function(){
      createController();
      $scope.you = mockUser;
      $scope.addUser();
      $scope.newPost = mockPost;
      $scope.addPost(true);
      expect(mockRoom.users[0].posts[0]).to.eql(mockPost);
    });

  });

});
