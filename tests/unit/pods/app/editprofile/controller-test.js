import { module, test, skip } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | app/editprofile', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:app/editprofile');
    assert.ok(controller);
  });

  test('toggle add email input field', function(assert) {
    let controller = this.owner.lookup('controller:app/editprofile');
    assert.equal(controller.get('isHidden'), true, 'isHidden initially true');

    controller.send('toggleAddEmail');
    assert.equal(controller.get('isHidden'), false, 'isHidden is false after user interaction');
  });

  // test('email is valid', function(assert) {
  //   let controller = this.owner.lookup('controller:app/editprofile');
  //
  //   controller.set('newEmail', 'test1@oslr.co.uk');
  //   assert.equal(controller.get('isValid'), true, 'email is valid');
  // });
  //
  // test('email not valid', function(assert) {
  //   let controller = this.owner.lookup('controller:app/editprofile');
  //
  //   controller.set('newEmail', 'testing3456');
  //   assert.notEqual(controller.get('isValid'), true, 'email not valid');
  // });

  skip('#addEmail', function(assert) {
    let controller = this.owner.lookup('controller:app/editprofile');
    let done = assert.async();

    assert.equal(controller.get('newEmail'), '', 'new email field blank');

    let newEmail = controller.set('newEmail', 'test6@oslr.co.uk');
    run(() => {
      controller.send('addEmail');
    });
    assert.equal(newEmail, 'test6@oslr.co.uk', 'should add email');
    done();
  });
});
