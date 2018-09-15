import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import Ember from 'ember';
import { hash } from 'rsvp';
export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return hash({
      availabilities: this.store.findAll('availability'),
      locations: this.store.findAll('location'),
      specialties: this.store.findAll('specialty')
    });
  },
  setupController(controller, model) {
    controller.set('locations', model.locations);
    controller.set('availabilities', model.availabilities);
  }
});
