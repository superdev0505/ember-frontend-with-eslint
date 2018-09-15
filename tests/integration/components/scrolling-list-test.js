import { module, test } from 'ember-qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('scrolling-list', 'Integration | Component | scrolling-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{scrolling-list}}`);
    let div_text = this.element.querySelector('.scrolling-list').text;
    assert.equal(div_text, undefined);
  });
});
