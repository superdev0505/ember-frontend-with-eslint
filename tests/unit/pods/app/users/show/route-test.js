import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | app/users/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:app/users/show');
    assert.ok(route);
  });
});
