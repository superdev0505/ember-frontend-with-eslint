import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | app/requests/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:app/requests/edit');
    assert.ok(route);
  });
});
