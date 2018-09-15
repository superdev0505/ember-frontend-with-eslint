/**
 * Injects the current user into the session object
 *
 * Based on this: http://miguelcamba.com/blog/2015/06/18/how-to-inject-the-current-user-using-ember-simple-auth/
 *
 * @module AppCore
 * @class initializers-simple-auth-setup
 **/
import ObjectProxy from '@ember/object/proxy';

export default {
  name: 'setup-simple-auth',
  after: 'ember-simple-auth',
  initialize(application) {

    let service = ObjectProxy.create({ isServiceFactory: true });
    application.register('service:current-user', service, { instantiate: false, singleton: true });
    application.inject('route', 'currentUser', 'service:current-user');
    application.inject('controller', 'currentUser', 'service:current-user');
    application.inject('component', 'currentUser', 'service:current-user');

    // Inject the service object
    application.inject('route', 'session', 'service:session');
    application.inject('controller', 'session', 'service:session');
    application.inject('component', 'session', 'service:session');

  }
};
