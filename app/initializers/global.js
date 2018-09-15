import config from '../config/environment';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
export function initialize(application) {

  application.register('service:api-url', `${config.DS.host}`, { instantiate: false });
  application.register('service:cable-url', `${config.DS.cableHost}`, { instantiate: false });
  application.register('service:app-environment', `${config.APP.environment}`, { instantiate: false });
  application.register('service:app-version', `${config.APP.appVersion}`, { instantiate: false });
  // application.register('service:enabled-modules', config.APP.enabledModules, { instantiate: false });

  application.inject('route', 'apiUrl', 'service:api-url');
  application.inject('controller', 'apiUrl', 'service:api-url');
  application.inject('component', 'apiUrl', 'service:api-url');
  application.inject('model', 'apiUrl', 'service:api-url');

  application.inject('route', 'cableUrl', 'service:cable-url');
  application.inject('controller', 'cableUrl', 'service:cable-url');
  application.inject('component', 'cableUrl', 'service:cable-url');
  application.inject('model', 'cableUrl', 'service:cable-url');

  application.inject('route', 'appEnvironment', 'service:app-environment');
  application.inject('controller', 'appEnvironment', 'service:app-environment');
  application.inject('component', 'appEnvironment', 'service:app-environment');
  application.inject('model', 'appEnvironment', 'service:app-environment');

  application.inject('route', 'appVersion', 'service:app-version');
  application.inject('controller', 'appVersion', 'service:app-version');
  application.inject('component', 'appVersion', 'service:app-version');
  application.inject('model', 'appVersion', 'service:app-version');

  // application.inject('route', 'enabledModules', 'service:enabled-modules');
  // application.inject('controller', 'enabledModules', 'service:enabled-modules');
  // application.inject('component', 'enabledModules', 'service:enabled-modules');
  // application.inject('model', 'enabledModules', 'service:enabled-modules');

  let jts = EmberObject.create();
  jts.set('all', A());
  let specs = EmberObject.create();
  specs.set('all', A());
  let locs = EmberObject.create();
  locs.set('all', A());
  application.register('oslrglobals:jobtitles', jts, { instantiate: false });
  application.register('oslrglobals:locations', locs, { instantiate: false });
  application.register('oslrglobals:specialties', specs, { instantiate: false });

  application.inject('route', 'jobtitles', 'oslrglobals:jobtitles');
  application.inject('controller', 'jobtitles', 'oslrglobals:jobtitles');
  application.inject('component', 'jobtitles', 'oslrglobals:jobtitles');

  application.inject('route', 'locations', 'oslrglobals:locations');
  application.inject('controller', 'locations', 'oslrglobals:locations');
  application.inject('component', 'locations', 'oslrglobals:locations');

  application.inject('route', 'specialties', 'oslrglobals:specialties');
  application.inject('controller', 'specialties', 'oslrglobals:specialties');
  application.inject('component', 'specialties', 'oslrglobals:specialties');

  // Variables to hold unread alerts, and an Alerts cable subscription
  application.register('oslrglobals:unread-alerts', EmberObject.create(), { instantiate: false });
  application.register('oslrglobals:alerts-subscription', EmberObject.create(), { instantiate: false });

  application.inject('controller', 'unreadAlerts', 'oslrglobals:unread-alerts');
  application.inject('route', 'unreadAlerts', 'oslrglobals:unread-alerts');
  application.inject('template', 'unreadAlerts', 'oslrglobals:unread-alerts');
  application.inject('controller', 'updatesSubscription', 'oslrglobals:alerts-subscription');
}

export default {
  name: 'globals',
  initialize
};
