import { module, test, skip } from 'qunit';
import { visit, currentURL, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import ENV from 'oslr-ui2/config/environment';
import signIn from 'oslr-ui2/tests/helpers/sign-in';

module('Acceptance | route visit', function(hooks) {
  setupApplicationTest(hooks);
  if (!ENV.APP.USE_API_FOR_TESTING) {
    setupMirage(hooks);
  }

  let approutes = [
    '/app/home/teach', '/app/home/learn',
    '/app/search/people', '/app/search/resources',
    '/app/add',
    '/app/alerts/activity', '/app/alerts/messages',
    '/app/myoslr',
    '/app/settings', '/app/notificationsettings',
    '/app/editprofile', 'app/editpassword'
  ];

  test('Visit all app routes when not logged in, ensure redirect', async function(assert) {

    // Check we can't access these routes without login
    for (let i = 0; i < approutes.length; i++) {
      let r = approutes[i];
      await visit(r);
      assert.equal(currentRouteName(), 'auth.login', `Successfully redirected to login from ${r} when not logged in`);
    }
  });

  test('Visit all app routes when logged in and check for errors', async function(assert) {
    if (!ENV.APP.USE_API_FOR_TESTING) {
      // Required for user profile test - need to load the users
      server.loadFixtures();
    }

    // Check we can access after login
    await signIn(assert, 'test1@oslr.co.uk');
    for (let i = 0; i < approutes.length; i++) {
      let r = approutes[i];
      await visit(r);
      assert.equal(currentURL(), r, `Sucessfully visited ${r}`);
    }
  });

  // Write skipped tests to remind us to write these routes
  for (let i = 0; i < approutes.length; i++) {
    let r = approutes[i];
    skip(`TODO: Write route ${r}`, async function(assert) {
      assert.expect(0);
    });
  }

  // Visit all auth routes when not logged in and ensure they work
  let authroutes = [
    '/auth/login', 'auth/register'
  ];
  test('Visit all auth routes when not logged in', async function(assert) {
    for (let i = 0; i < authroutes.length; i++) {
      let r = authroutes[i];
      await visit(r);
      assert.equal(currentURL(), r, `Successfully loaded ${r} when not logged in`);
    }
  });
  test('Visit all auth routes when logged in, ensure redirect', async function(assert) {
    for (let i = 0; i < authroutes.length; i++) {
      await signIn(assert, 'test1@oslr.co.uk');
      let r = authroutes[i];
      await visit(r);
      assert.equal(currentURL(), '/app/home/teach', `Successfully redirected from ${r} when logged in`);
    }
  });
});
