import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui2/tests/helpers/sign-in';
import ENV from 'oslr-ui2/config/environment';
// import $ from 'jquery';

module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);
  if (!ENV.APP.USE_API_FOR_TESTING) {
    setupMirage(hooks);
  }

  test('Home pages render when logged in', async function(assert) {

    // let homePages = [
    //   'teach',
    //   'learn',
    //   'log',
    //   'more'
    // ];
    await visit('/');
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/home/teach');
    assert.equal(currentURL(), '/app/home/teach', 'Successfully login and redirect to home');
    //  for (let i = 0; i < homePages.length; i++) {
    //    let page = homePages[i];
    //    let pageUrl = `/home/${page}`;
    //    await visit(pageUrl);
    //    assert.equal(currentURL(), pageUrl, `Successfully rendered page ${pageUrl}`);
    //
    //    // Check the alerts link is present
    //    assert.equal($('.alertsBTN').length, 1, 'Alerts button present on page');
    //
    //    // Check the bottom navbar is presentw
    //    assert.equal($('.navbar-footer').length, 1, 'Footer menu is rendered');
    //    homePages.forEach(function(footerPage) {
    //      assert.equal($(`.navbar-footer-button-${footerPage}`).length, 1, `Footer has ${footerPage} button`);
    //      if (footerPage === page) {
    //        assert.equal($(`navbar-footer-button-${footerPage}.active`).length, 1, `${footerPage} footer button is active`);
    //      } else {
    //        assert.equal($(`.navbar-footer-button-${footerPage}.active`).length, 0, `${footerPage} footer button is not active`);
    //      }
    //    });
    //
    //    //Check the alerts link
    //    await click('.alertsBTN');
    //
    //    assert.equal(currentURL(), '/app/main/alerts', 'Alert link works');
    //
    //    for (let j = 0; j < homePages.length; j++) {
    //      let footerPage = homePages[i];
    //      if (footerPage === page) {
    //        return false;
    //      }
    //      await visit(pageUrl);
    //
    //      await click(`.navbar-footer-button-${footerPage}`);
    //
    //      assert.equal(currentURL(), `/app/main/home/${footerPage}`, `Link from ${page} to ${footerPage} page successful`);
    //    }
    // }

  });
});
