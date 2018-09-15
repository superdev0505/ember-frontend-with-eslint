import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
// Splash screen service not working, defined as advised here: http://embercordova.com/pages/workflow/icon_splash_management
// import { inject } from '@ember/service';

export default Route.extend(ApplicationRouteMixin).extend({
  // splashscreenService: inject('ember-cordova/splash'),
  //
  // afterModel() {
  //   this.get('splashScreenService').hide();
  // }
});
