import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  find,
  click,
  settled } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { setupApplicationTest } from 'ember-qunit';
import ENV from 'oslr-ui2/config/environment';
import { invalidateSession }   from 'ember-simple-auth/test-support';
import signIn from 'oslr-ui2/tests/helpers/sign-in';

module('Acceptance | user show page', function(hooks) {
  setupApplicationTest(hooks);
  if (!ENV.APP.USE_API_FOR_TESTING) {
    setupMirage(hooks);
  }

  hooks.beforeEach(function() {
    if (!ENV.APP.USE_API_FOR_TESTING) {
      window.server.logging = true;
      window.server.loadFixtures();
    }
  });

  test('visiting user show page', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');

    await visit('/app/users/1');
    assert.equal(currentURL(), '/app/users/1', 'should have same url');
    assert.equal(this.element.querySelector('#edit-profile').textContent, 'Edit profile', 'should have a button to edit user');

    await click('#edit-profile');
    await settled();

    assert.equal(currentURL(), '/app/editprofile', 'should go to user edit page after click edit profile');

    await selectChoose('#selectLocation', '.ember-power-select-option', 0);
    await selectChoose('#selectLocation', '.ember-power-select-option', 1);
    await click('#saveChanges');
    await settled();

    assert.equal(find('.locations').childElementCount, 2, 'should have two li tags');
  });
});
