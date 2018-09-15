import { visit, currentURL, fillIn, click, settled } from '@ember/test-helpers';
import { currentSession, invalidateSession } from 'ember-simple-auth/test-support';

// export default registerAsyncHelper('signIn', function(application, assert, email, password) {
export default async function signIn(assert, email, password) {

  assert.equal(1, 1, `SignIn Helper: Logging in ${email.toString()}`);

  if (!password) {
    password = 'testing123';
  }

  await invalidateSession();

  await visit('/auth/login');

  assert.equal(currentURL(), '/auth/login', 'Login page shown');
  // assert.equal(find('#identification').length, 1, 'Found login field');

  // Now entering correct credentails
  fillIn('#identification', 'test1@oslr.co.uk');
  fillIn('#password', 'testing123');

  // <--------- CLICKING THE LOGIN BUTTON --------->

  // Click the login submit button -> log in the user
  await click('.login-btn');
  await settled();

  // <--------- VERIFYING USER AND RETURING PATH --------->
  // verify if user is logged in
  assert.equal(currentSession().get('data.authenticated.user_email'), email, `Successfully logged in ${email}`);
}
