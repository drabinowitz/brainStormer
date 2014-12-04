describe('routing',function(){
  var $state;
  beforeEach(module('BS'));
  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
  }));

  it('should have the states and associated templates and controllers',function(){
    expect($state.get('welcome')).to.be.ok();
    expect($state.get('welcome').controller).to.be('welcomeController');
    expect($state.get('welcome').templateUrl).to.be('app/welcome/welcome.html');
    expect($state.get('rooms')).to.be.ok();
    expect($state.get('rooms.room')).to.be.ok();
    expect($state.get('rooms.room').controller).to.be('roomController');
    expect($state.get('rooms.room').templateUrl).to.be('app/rooms/room/room.html');
  });

});
