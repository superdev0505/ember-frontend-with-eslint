import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | terms-conditions', function(hooks) {
  setupRenderingTest(hooks);

  test('should display terms and conditions link', async function(assert) {
    await render(hbs `{{terms-conditions}}`);

    let termsLink = find('[data-test-link]');
    assert.equal(termsLink, 'http://www.oslr.co.uk/terms-and-conditions/', 'shows terms and conditions link');
  });

  test('should display privacy policy link', async function(assert) {
    await render(hbs `{{terms-conditions}}`);

    let privacyLink = find('[data-test-privacy-link]');
    assert.equal(privacyLink, 'http://www.oslr.co.uk/privacy-policy/', 'shows privacy policy link');
  });

  test('checkbox is visible', async function(assert) {
    await render(hbs `{{terms-conditions}}`);

    let checkbox = this.element.querySelectorAll('input');
    assert.equal(checkbox.length, 1, 'shows checkbox');
  });

  test('when checkbox un-ticked', async function(assert) {
    await render(hbs `{{terms-conditions}}`);

    let isChecked = this.element.querySelector('.agree').checked;
    assert.equal(isChecked, false, 'box is un-ticked');
  });

  test('when checkbox ticked', async function(assert) {
    await render(hbs `{{terms-conditions}}`);

    let checkbox = this.element.querySelector('.agree');

    await triggerEvent(checkbox, 'click');
    assert.equal(checkbox.checked, true, 'box is ticked');
  });

});
