import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

// Overwrite window.alert and window.confirm
// Without this, tests fail when they encounter alert/confirm
// Assume we always click yes to confirm dialogs
window.alert = function() {
  return false;
};
window.confirm = function() {
  return true;
};

start();
