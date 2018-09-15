/* global server */
import { module, test } from 'qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, currentURL, currentRouteName, click, fillIn, find, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';
import { selectChoose } from 'ember-power-select/test-support';
import $ from 'jquery';
import ENV from 'oslr-ui2/config/environment';
import {
  // currentSession,
  invalidateSession

} from 'ember-simple-auth/test-support';
import signIn from 'oslr-ui2/tests/helpers/sign-in';

module('Acceptance | teach creating', function(hooks) {
  setupApplicationTest(hooks);

  if (!ENV.APP.USE_API_FOR_TESTING) {
    setupMirage(hooks);

  }

  hooks.beforeEach(function() {
    if (!ENV.APP.USE_API_FOR_TESTING) {
      window.server.logging = true;
      server.loadFixtures();
    }
  });

  test('visiting /app/availabilities/new', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    assert.equal(currentURL(), '/app/availabilities/new');
  });

  test('it returns the correct location entered', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    await fillIn('#locateinfo', 'Barnet Province');
    await fillIn('#maxStudents', '20');
    await selectChoose('.form-groups', 'Mount St Elsewhere');
    await fillIn('#info', 'cardiology sessions');
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 10, 20));
    await click('button[type=submit]');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach created');
    assert.equal(find('.selectedlocation').textContent.trim(), 'Mount St Elsewhere', 'Found location');
  });

  test('it returns the multipple specialties', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    await fillIn('#locateinfo', 'Barnet Province');
    await fillIn('#maxStudents', '20');
    await selectChoose('.form-groups', 'Mount St Elsewhere');
    await fillIn('#info', 'cardiology sessions');
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 8, 20));
    await selectChoose('.theSpecial', 'Allergy');
    await selectChoose('.theSpecial', 'Anaesthetics');
    await fillIn('#info', 'cardiology sessions');
    await click('button[type=submit]');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach created');
    assert.equal(find('.specialty').textContent.trim(), 'Allergy', 'Anaesthetics');
  });
  test('it returns the correct maximum student entered', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    await fillIn('#locateinfo', 'Barnet Province');
    await fillIn('#maxStudents', 20);
    await fillIn('#info', 'cardiology sessions');
    await selectChoose('.form-groups', '.ember-power-select-option', 1);
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 8, 20));
    await click('button[type=submit]');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach');
    assert.equal(find('.maxstu').textContent.trim(),  20, 'found this one');
  });

  test('it returns the correct info entered', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    await fillIn('#locateinfo', 'Barnet Province');
    await selectChoose('.form-groups', '.ember-power-select-option', 2);
    fillIn('#info', 'cardiology sessions');
    await fillIn('#maxStudents', '20');
    await selectChoose('.theSpecial', '.ember-power-select-option', 2);
    await click('#privacy');
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 8, 20));
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach');
    assert.equal(find('.theinfo').textContent, 'cardiology sessions');
  });

  test('it returns the correct location info  entered', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    await fillIn('#locateinfo', 'Barnet Province');
    fillIn('#maxStudents', '20');
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 8, 20));
    await selectChoose('.form-groups', '.ember-power-select-option', 0);
    await fillIn('#info', 'cardiology sessions');
    assert.equal(this.element.querySelector('#locateinfo').value, 'Barnet Province');
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach');
    assert.equal(find('.theSession').textContent, 'Barnet Province');
  });

  test('date picker is present when the user opens it and returns correct date', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    let interactor = openDatepicker($('#startTime'));
    await interactor.selectDate(new Date(2018, 8, 19));
    assert.equal(interactor.selectedYear(), 2018);
    assert.equal(interactor.selectedMonth(), 8);
    assert.equal(interactor.selectedDay(), 19);
    await click('.create');
  });

  test('it returns the multiple job-titles when creating a teaching session', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    fillIn('#locateinfo', 'Cardiology');
    fillIn('#maxStudents', '20');
    fillIn('#info', 'Cardiology tutorial');
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 8, 20));
    await selectChoose('.form-groups', '.ember-power-select-option', 2);
    await  selectChoose('.jobTitle', 'Medical Student - Pre-clinical');
    await  selectChoose('.jobTitle', 'Medical Student - Year 3');
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach created');
    assert.equal(find('.jobtitle').textContent, 'Medical Student - Pre-clinical', 'Medical Student - Year 3');
  });

  test('it returns the correct endTime entered', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    fillIn('#locateinfo', 'Barnet Province');
    fillIn('#maxStudents', '20');
    fillIn('#info', 'Cardiology tutorial');
    await selectChoose('.form-groups', '.ember-power-select-option', 2);
    let interactor1 = openDatepicker($('#startTime'));
    interactor1.selectDate(new Date(2018, 9, 19));
    let interactor = openDatepicker($('#endTime'));
    interactor.selectDate(new Date(2018, 10, 19));
    this.set('#sessionName', 'Cardiology');
    this.set('#maxStudents', '20');
    this.set('form-groups', '.ember-power-select-option', 2);
    this.set('#info', 'cardiology sessions');
    this.set('#startTime', '2018/10/14');
    this.set('#endTime', '2018/10/19');
    assert.equal(interactor.selectedDay(), 19);
    assert.equal(interactor.selectedMonth(), 10);
    assert.equal(interactor.selectedYear(), 2018);
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach created');
    assert.equal(find('.endingAt').textContent, '00:00 19/11/18');
  });

  test('it returns the correct startTime entered', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    fillIn('#locateinfo', 'Cardiology');
    fillIn('#maxStudents', '20');
    fillIn('#info', 'Cardiology tutorial');
    await selectChoose('.form-groups', '.ember-power-select-option', 2);
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 7, 20));
    this.set('#sessionName', 'Cardiology');
    this.set('#maxStudents', '20');
    this.set('form-groups', 'Royal free Hospital');
    this.set('#info', 'Cardiology tutorial');
    this.set('#startTime', '2018/7/20');
    this.set('#endTime', '2018/8/19');
    assert.equal(interactor.selectedYear(), 2018);
    assert.equal(interactor.selectedMonth(), 7);
    assert.equal(interactor.selectedDay(), 20);
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach created');
    assert.equal(find('.starting').textContent, '00:00 20/08/18');
  });

  test('I can see a checkbox for selecting a session as Private', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    assert.equal(this.element.querySelectorAll('.form-groups').length, 1, 'should display one checkbox');
  });
  test('after teaching session is created the user gets redirected to the availabilities page', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    await fillIn('#locateinfo', 'Cardiology');
    await fillIn('#maxStudents', '20');
    await selectChoose('.form-groups', '.ember-power-select-option', 1);
    await fillIn('#info', 'Cardiology tutorial');
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    assert.equal(interactor.selectedYear(), 2018);
    assert.equal(interactor.selectedMonth(), 7);
    assert.equal(interactor.selectedDay(), 20);
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 7, 20));
    await click('button[type=submit]');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach created');
  });

  test('if a user is not logged in they wont be able to view  availabilities page', async function(assert) {
    invalidateSession();
    await visit('/app/home/learn');
    assert.equal(currentURL(), '/auth/login', 'user not logged in so they cannot view  availabilities page');
  });
  test('that you can sucessfully edit info from a teaching session when created', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    await fillIn('#locateinfo', 'Cardiology');
    await fillIn('#maxStudents', '20');
    await selectChoose('.form-groups', '.ember-power-select-option', 1);
    await fillIn('#info', 'Cardiology tutorial');
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    assert.equal(interactor.selectedYear(), 2018);
    assert.equal(interactor.selectedMonth(), 7);
    assert.equal(interactor.selectedDay(), 20);
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 7, 20));
    //  user clicks button submits details for new teaching session
    await click('button[type=submit]');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach');
    assert.equal(find('.theinfo').textContent, 'Cardiology tutorial');
    await settled;
    // user clicks this button to go the Edit page
    await click('.button');
    assert.equal(currentRouteName(), 'app.availabilities.edit', 'user gets redirected to the availabilities edit page');
    // users changes details for the field with id=info
    await fillIn('#info', 'Cardiology tutorial are the best');
    // user clicks the .create  class  and gets redirected to the show page with new details editied.
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities page');
    assert.equal(find('.theinfo').textContent, 'Cardiology tutorial are the best');
  });

  test(' A teaching session cannot be saved if the start time or end Time is not enetered', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    fillIn('#locateinfo', 'Cardiology');
    fillIn('#maxStudents', '20');
    fillIn('#info', 'Cardiology tutorial');
    await selectChoose('.form-groups', '.ember-power-select-option', 2);
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.new',  'failed to Save because endTime field was not inputted', ' user still remains on new page until endTime is inputted');
  });
  test('the edit controller catches an error 422 from the server side if startime is null', async function(assert) {
    invalidateSession();
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('/app/availabilities/new');
    fillIn('#locateinfo', 'Cardiology');
    fillIn('#maxStudents', '20');
    fillIn('#info', 'Cardiology tutorial');
    await selectChoose('.form-groups', '.ember-power-select-option', 2);
    let interactor = openDatepicker($('#startTime'));
    interactor.selectDate(new Date(2018, 7, 20));
    let interactor1 = openDatepicker($('#endTime'));
    interactor1.selectDate(new Date(2018, 7, 20));
    await click('.create');
    assert.equal(currentRouteName(), 'app.availabilities.show', 'user gets redirected to the availabilities show page teach');
    assert.equal(find('.theinfo').textContent, 'Cardiology tutorial');
    await click('.button');
    assert.equal(currentRouteName(), 'app.availabilities.edit', 'user gets redirected to the availabilities edit page');
    await settled;
    //  let interactor3 = openDatepicker($('#startTime'));
    //    interactor3.selectDate(new Date('2018/7/20'));
    //    await click('.create')
    //    assert.equal(errors, false, 'No errors  displayed');
  });
});
