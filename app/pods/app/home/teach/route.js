import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
  model() {
    return A(); // Populated in controller
    // return this.store.findAll('availability');
  },

  setupController(controller, model) {
    this._super(controller, model);

    // Get the current user's locations and set as a filter
    this.store.query('user-location', {
      'filter[user_id]': this.get('session.data.authenticated.user_id'),
      include: 'location'
    }).then(function(uls) {
      controller.set('searchLocations', uls.map(function(x) {
        return x.get('location');
      }));
    });

    // Load all locations - used for filtering so need to be cached
    this.store.findAll('location');
  }
});
