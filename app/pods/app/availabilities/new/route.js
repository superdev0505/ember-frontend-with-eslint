import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  model() {
    return this.store.createRecord('availability');
  },

  setupController(controller, model) {
    this._super(controller, model);
    // By default, use the logged-in user's first stored location object
    this.store.query('user-location', {
      'filter[user_id]': this.get('session.data.authenticated.user_id'),
      include: 'location'
    }).then(function(joins) {
      model.set('location', joins.get('firstObject.location'));
    });
  }

});
