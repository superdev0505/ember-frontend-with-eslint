import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | app/home/teach', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:app/home/teach');
    assert.ok(route);
  });
});
