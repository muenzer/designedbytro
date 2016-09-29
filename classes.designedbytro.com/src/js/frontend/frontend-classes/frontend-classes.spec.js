describe('component: frontendClasses', function() {
  var $componentController;

  beforeEach(module('frontendClasses'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('should expose a `frontendClassesImage` object', function() {
    // Here we are passing actual bindings to the component
    var bindings = {image: 'foo.jpg'};
    var ctrl = $componentController('frontendClassesImage', null, bindings);

    expect(ctrl).toBeDefined();
    expect(ctrl.image).toBe('foo.jpg');
  });
  });
