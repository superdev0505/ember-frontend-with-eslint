import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  errorMessage: '',

  model(params) {
    return this.get('store').findRecord('user', params.user_id, { include: 'job-title,locations' });
  },

  setupController(controller, model) {
    controller.set('model', model);

    // User Location query
    this.get('store').findAll('userLocation')
      .then((results) => {
        controller.set('userLocations', results);
      })
      .catch((err) => {
        controller.set('errorMessage', err);
      });

    // // Location query
    // this.get('store').findAll('location')
    //   .then((results) => {
    //     controller.set('locations', results);
    //   })
    //   .catch((err) => {
    //     controller.set('errorMessage', err);
    //   });
  }
});
