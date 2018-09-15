import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | noaccess/unconfirmed', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:noaccess/unconfirmed');
    assert.ok(route);
  });
});
