describe('The data module has a', function() {

  beforeEach(angular.mock.module('data'));

  describe('Users factory', function() {
    var dataFactory;

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_dataFactory_) {
      dataFactory = _dataFactory_;
    }));

    // A simple test to verify the Users factory exists
    it('should exist', function() {
      expect(dataFactory).toBeDefined();
    });
  });

  xdescribe('participants resouce', function() {
    var participants;

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_participants_) {
    participants = _participants_;
  }));

  // A simple test to verify the Users factory exists
  it('that should exist', function() {
    expect(participants).toBeDefined();
  });

  it('that should have a query function', function() {
    expect(participants.query()).toBeDefined();
  });

  it('that should return some data', function(done) {
    var data = null;

      data = participants.query(function(extries) {
        console.log(extries);
        done();
    });

    expect(data).toBeDefined();
  });
});
});
