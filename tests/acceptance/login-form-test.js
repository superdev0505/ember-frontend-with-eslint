import { module, test, skip } from 'qunit';
import { get } from '@ember/object';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { click, visit, currentURL, fillIn, settled } from '@ember/test-helpers';
import ENV from 'oslr-ui2/config/environment';
import signIn from 'oslr-ui2/tests/helpers/sign-in';

import {
  currentSession,
  invalidateSession
}   from 'ember-simple-auth/test-support';

module('Acceptance | login form', function(hooks) {
  setupApplicationTest(hooks);
  if (!ENV.APP.USE_API_FOR_TESTING) {
    setupMirage(hooks);
  }

  test('should show login as the index page', async function(assert) {
    invalidateSession();
    await visit('/');
    assert.equal(currentURL(), '/auth/login', 'should redirect automatically');
  });

  test('If a user is not logged in, they see a login form', async function(assert) {
    invalidateSession();
    await visit('/');
    assert.equal(this.element.querySelectorAll('#loginForm').length, 1, 'should display the form');

  });

  test('A user cannot access the home page unless logged in', async function(assert) {
    await visit('/app/home/teach');
    assert.equal(currentURL(), '/auth/login', 'Redirected from home to login when not logged in');
    fillIn('#identification', 'test1@oslr.co.uk');
    fillIn('#password', 'testing123');
    await click('.login-btn');
    await settled();
    assert.equal(currentURL(), '/app/home/teach');
  });

  skip('if a user is logged in, they see a logout button', async function(assert) {
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/settings');
    assert.equal(this.element.querySelectorAll('.logoutbutton').length, 1, 'should display button');
  });

  test('user can logout', async function(assert) {
    await signIn(assert, 'test1@oslr.co.uk');
    assert.equal(get(currentSession(), 'isAuthenticated'), true, 'User is authenticated');
    await visit('/app/settings');
    await click('.submit');
    assert.equal(get(currentSession(), 'isAuthenticated'), false, 'After clicking logout, the user is no longer logged in');
  });

  test('user can login', async function(assert) {
    invalidateSession();
    await visit('/');

    fillIn('#identification', 'test5@oslr.co.uk');
    fillIn('#password', 'testing123');

    await click('.login-btn');
    await settled();

    let sesh = currentSession();
    let isAuthed = get(sesh, 'isAuthenticated');
    assert.equal(
      isAuthed,
      true,
      'after a user submits good creds to login form, they are logged in'
    );

    let loginFormPresent = find('#loginForm').length > 0 ? true : false;
    assert.equal(
      loginFormPresent,
      false,
      'after we login, the login form disappears'
    );
  });

  test('If a user puts in the wrong login credentials, they see a login error', async function(assert) {
    await invalidateSession();
    await visit('/');
    assert.equal(this.element.querySelectorAll('.login-err').length, 0, 'No login error shown on page load');

    fillIn('#identification', 'lester@test.com');
    fillIn('#password', 'wrongPassword');
    await click('.login-btn');
    await settled();
    let sesh = currentSession();
    let isAuthed = get(sesh, 'isAuthenticated'); // next
    assert.equal(isAuthed, false, 'User submits bad username and password, fails');
    assert.equal(this.element.querySelector('.login-err').textContent, 'invalid-credentials');
    assert.equal(this.element.querySelectorAll('#loginForm').length, 1,  'loginform still present');
  });

  // test(' fields cant be blank when filling in', async function(assert) {
  // invalidateSession();
  // await visit('/');
  // fillIn('#identification', '');
  // fillIn('#password', 'testing123');
  // await click('.login-btn');
  // await settled();
  // let sesh = currentSession();
  // let isAuthed = get(sesh, 'isAuthenticated');
  // assert.equal(isAuthed, false, 'User cannot login with blank field');
  // });

  // test(' email must be in valid format when logging in', async function(assert) {
//    invalidateSession();
  //  await visit('/');
  //  fillIn('#identification', '121gmail.com');
  //  fillIn('#password', 'testing123');
  //  await click('.login-btn');
  //  await settled();
//    let sesh = currentSession();
//    let isAuthed = get(sesh, 'isAuthenticated');
  //  assert.equal(isAuthed, false, 'User cannot login with an invalid format email');

//  });

});
