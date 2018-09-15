import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, settled } from '@ember/test-helpers';
import { setupApplicationTest, skip } from 'ember-qunit';
import ENV from 'oslr-ui2/config/environment';

module('Acceptance | register form test', function(hooks) {
  setupApplicationTest(hooks);
  if (!ENV.APP.USE_API_FOR_TESTING) {
    setupMirage(hooks);
  }

  test('visiting /register', async function(assert) {
    await visit('/auth/register');

    assert.equal(currentURL(), '/auth/register');
  });

  test('new user can sign up via registration form', async function(assert) {
    // To avoid 'email has already been taken' error use a random email
    let email = `test_${Math.floor((Math.random() * 100000) + 20).toString()}@oslr.co.uk`;
    if (!ENV.APP.USE_API_FOR_TESTING) {
      server.create('user', {
        email,
        password: 'secret123',
        password_confirmation: 'secret123' });
    }

    await visit('/auth/register');

    await fillIn('#name', 'John');
    await fillIn('#identification', email);
    await fillIn('#password', 'secret123');
    await fillIn('#passwordConfirmation', 'secret123');
    await click('#checkbox');
    await click('[data-test-registration-button]');
    await settled();

    assert.equal(currentURL(), '/noaccess/unconfirmed');
    if (!ENV.APP.USE_API_FOR_TESTING) {
      assert.equal(server.db.users[0].email, email);
    }
  });

  skip('confirmation process', async function(assert) {
    assert.expect(0);
    // let user = server.create('user', { email: 'test_1@oslr.co.uk', password: 'secret123', password_confirmation: 'secret123' });

    window.server.post('/email_accounts');
    // Arriving at noaccess.unconfirmed page
    await visit('/noaccess/unconfirmed/');

    // , you should see another form
    // with the title of 'Enter confirmation code here'.
    // There should also be a input field and a submit code button
  });

  test('new user tries to submit a blank form', async function(assert) {
    await visit('/auth/register');

    await click('[data-test-registration-button]');

    assert.equal(currentURL(), '/auth/register', 'should not progress to next page');
  });

  test('input fields except password/password_confirmation blank', async function(assert) {
    await visit('/auth/register');

    let testUser = {
      name: 'Test',
      email: 'test_123@oslr.co.uk',
      password: 'secret123',
      password_confirmation: 'secret123'

    };

    await fillIn('[data-test-name]', testUser.name);
    await fillIn('[data-test-email]', testUser.email);

    assert.notEqual('input[type=password] ', '', 'password can\'t be blank');
  });

});
