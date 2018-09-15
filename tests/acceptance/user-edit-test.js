import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test, skip } from 'qunit';
import {
  visit,
  currentURL,
  find,
  fillIn,
  click,
  settled,
  triggerEvent } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { setupApplicationTest } from 'ember-qunit';
import ENV from 'oslr-ui2/config/environment';
import { invalidateSession }   from 'ember-simple-auth/test-support';
import signIn from 'oslr-ui2/tests/helpers/sign-in';

module('Acceptance | user edit', function(hooks) {
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

  test('User redirected to log in if not logged in', async function(assert) {
    // User not logged in
    invalidateSession();
    await visit('app/editprofile');

    assert.equal(currentURL(), '/auth/login', 'user redirected to login page');
    assert.equal(this.element.querySelectorAll('#loginForm').length, 1, 'should display the form');

  });

  test('Log in and edit user', async function(assert) {
    invalidateSession();
    // Log in user
    await signIn(assert, 'test1@oslr.co.uk');

    // Visit edit page
    await visit('app/users/1');

    await settled();
    assert.equal(currentURL(), 'app/users/1', 'should display user');

    await click('#edit-profile');
    await settled();
    assert.equal(currentURL(), '/app/editprofile', 'should be able to edit user');
    assert.equal(this.element.querySelectorAll('#saveChanges').length, 1, 'should have save changes button');

    // Input new information
    await fillIn('#updateName', 'John Q');
    await fillIn('#updateBio', 'Changing my bio for my profile');
    await selectChoose('#selectLevel', '.ember-power-select-option', 0);
    await selectChoose('#selectLocation', '.ember-power-select-option', 0);
    await selectChoose('#selectLocation', '.ember-power-select-option', 1);
    // Upload image
    let uploadedImage = 'image.png';
    let inputElement = find('.img-circle-profile');
    await triggerEvent(inputElement, uploadedImage);

    await click('#saveChanges');
    await settled();

    // Returns to user show page and name, email, and job title/level have changed
    assert.equal(find('.name').textContent, 'John Q', 'updated name should be displayed');
    assert.equal(find('.bio').textContent, 'Changing my bio for my profile', 'updated bio should be displayed');
    assert.equal(find('.jobTitle').textContent, 'Medical Student - Year 3', 'updated job title is displayed');
  });

  test('User can add an email', async function(assert) {
    // Log in user
    await signIn(assert, 'test1@oslr.co.uk');

    await visit('/app/users/1');
    await click('#edit-profile');

    assert.equal(currentURL(), '/app/editprofile', 'displays edit page');

    await click(find('.add-email-button'));
    assert.ok(find('#addEmail'), 'new email input field is present');
  });

  // TODO - this fails with strange error
  skip('cannot add bad email', async function(assert) {
    await signIn(assert, 'test1@oslr.co.uk');

    await visit('/app/users/1');
    assert.equal(this.element.querySelectorAll('.secondaryEmail').length, 0, 'No secondary emails on page load');
    await click('#edit-profile');
    await click(find('.add-email-button'));
    await fillIn('#addEmail', 'sfsdgsdg');
    await click('.add-button');
    assert.equal(this.element.querySelectorAll('.secondaryEmail').length, 0, 'No secondary emails after attempt to add bad email');
  });

  test('newly added email is present but unconfirmed', async function(assert) {
    // Log in user
    await signIn(assert, 'test1@oslr.co.uk');

    let email = `test_${Math.floor((Math.random() * 100000) + 20).toString()}@oslr.co.uk`;

    await visit('/app/users/1');
    await click('#edit-profile');

    assert.equal(currentURL(), '/app/editprofile', 'displays edit page');

    await click(find('.add-email-button'));
    await fillIn('#addEmail', email);

    assert.equal(find('#addEmail').value, email, 'fills in email input.');

    await click('.add-button');

    // Check the email is included in the secondary email list
    let secondaryEmailsList = this.element.querySelectorAll('.secondaryEmail');
    let secondaryEmails = [];
    for (let i = 0; i < secondaryEmailsList.length; i++) {
      secondaryEmails[i] = secondaryEmailsList[i].textContent.trim();
    }
    assert.ok(secondaryEmails.includes(email), 'displays secondary email');

    // let [findSecondaryEmail] = this.element.querySelectorAll(`.secondaryEmail:contains('${email}')`);
    // assert.equal(findSecondaryEmail.textContent.trim(), email, 'displays secondary email');
    // assert.equal(find('.small-subtext span').textContent.trim(), 'Unconfirmed email', 'displays unconfirmed email text');
  });

  test('click dropdown button and enter confirmation code', async function(assert) {
    // Log in user
    await signIn(assert, 'test1@oslr.co.uk');
    let email = `test_${Math.floor((Math.random() * 100000) + 20).toString()}@oslr.co.uk`;

    await visit('/app/users/1');
    await click('#edit-profile');

    assert.equal(currentURL(), '/app/editprofile', 'displays edit page');

    await click(find('.add-email-button'));
    await fillIn('#addEmail', email);
    await click('.add-button');

    let secondaryEmailsList = this.element.querySelectorAll('.secondaryEmail');
    let secondaryEmails = [];
    for (let i = 0; i < secondaryEmailsList.length; i++) {
      secondaryEmails[i] = secondaryEmailsList[i].textContent.trim();
    }
    assert.ok(secondaryEmails.includes(email), 'displays secondary email');
    let findSecondaryEmail = secondaryEmailsList[secondaryEmails.indexOf(email)];
    // let [findSecondaryEmail] = this.element.querySelectorAll('.secondaryEmail');
    // assert.equal(findSecondaryEmail.textContent.trim(), email, 'displays secondary email');

    assert.equal(findSecondaryEmail.parentElement.querySelector('.small-subtext span').textContent.trim(), 'Unconfirmed email', 'displays unconfirmed email text');
    assert.equal(findSecondaryEmail.parentElement.querySelector('.dropdown-button').childElementCount, 1, 'dropdown toggle button is displayed');
    await click(findSecondaryEmail.parentElement.querySelector('.dropdown-button'));

    assert.equal(findSecondaryEmail.parentElement.parentElement.querySelectorAll('.confirm-code-input').length, 1, 'Code input field found for new email');

    // Enter the wrong code - should receive an error
    fillIn('.confirm-code-input', '54321');
    await click('.submit-code-button');
    assert.equal(findSecondaryEmail.parentElement.parentElement.querySelectorAll('.confirm-code-input').length, 1, 'Code input field found for new email after incorrect submission');
    // Now enter the right code
    fillIn(findSecondaryEmail.parentElement.parentElement.querySelector('.confirm-code-input'), '123456');
    await click(findSecondaryEmail.parentElement.parentElement.querySelector('.submit-code-button'));
    assert.equal(findSecondaryEmail.parentElement.parentElement.querySelectorAll('.confirm-code-input').length, 0, 'Code input field NOT found for new email after correct submission');
    // Now delete it
    await click(findSecondaryEmail.parentElement.querySelector('.dropdown-button'));
    assert.equal(findSecondaryEmail.parentElement.querySelectorAll('[data-test-delete-emailaccount]').length, 1, 'Delete email button shown');
    await click('[data-test-delete-emailaccount]');

    secondaryEmailsList = this.element.querySelectorAll('.secondaryEmail');
    secondaryEmails = [];
    for (let i = 0; i < secondaryEmailsList.length; i++) {
      secondaryEmails[i] = secondaryEmailsList[i].textContent.trim();
    }
    assert.ok(!secondaryEmails.includes(email), 'Secondary email deleted as expected');
    // findSecondaryEmail = secondaryEmailsList[secondaryEmails.indexOf(email)];
    // assert.equal(this.element.querySelectorAll('.secondaryEmail').length, 0, 'Secondary email deleted as expected');
  });

  // Model should rollback if we leave the page with dirty attributes
  // Test the positive case here - that we can leave the page
  test('Test attribute rollback', async function(assert) {
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/editprofile');
    await fillIn('#updateName', 'John Q');
    await click('[data-test-back-button]');
    assert.equal(currentURL(), '/app/settings');
  });
});
