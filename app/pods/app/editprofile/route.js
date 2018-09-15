import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  errorMessage: '',

  model() {
    let user_id = this.get('session.data.authenticated.user_id');
    return this.get('store').findRecord('user', user_id);
    // return this.get('store').findRecord('user', params.user_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.get('store').findAll('job-title')
      .then((results) => {
        controller.set('jobTitles', results);
      })
      .catch((err) => {
        controller.set('errorMessage', err);
      });

    this.get('store').findAll('location')
      .then((results) => {
        controller.set('locations', results);
      })
      .catch((err) => {
        controller.set('errorMessage', err);
      });
  },

  actions: {
    saveChanges(user) {
      user.save().then(() => this.transitionTo('app.users.show', user.id));
    },

    willTransition(transition) {
      let model = this.controller.get('model');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't been saved yet. Would you like to leave this page?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
