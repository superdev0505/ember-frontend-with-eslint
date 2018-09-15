import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | feedback request', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  skip('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('feedback-request', {});
    assert.ok(model);
  });
});
