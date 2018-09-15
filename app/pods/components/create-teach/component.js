import Component from '@ember/component';
import { inject } from '@ember/service';
export default Component.extend({
  store: inject(),
  init() {
    // this.locations = [];
    // this.specialties = [];
    // this.jobtitles = [];
    this._super(...arguments);
    let _this = this;
    this.get('store').findAll('location').then(function(locs) {
      _this.set('locations', locs);
    }),
    this.get('store').findAll('specialty').then(function(specs) {
      _this.set('specialties', specs);

    }),
    this.get('store').findAll('job-title').then(function(jobs) {
      _this.set('jobtitles', jobs);

    });
  },
  actions: {
    submit() {
      let availability = this.get('availability');
      this.triggerSave(availability);

    }
  }
});
