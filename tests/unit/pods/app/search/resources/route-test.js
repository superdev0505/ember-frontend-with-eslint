import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | app/search/resources', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:app/search/resources');
    assert.ok(route);
  });
});
