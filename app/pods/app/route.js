import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  init() {
    this._super(...arguments);
    // Override the default AuthenticatedRouteMixin to use auth.login instead of login as the login page.
    this.set('authenticationRoute', 'auth.login');
  }
});
