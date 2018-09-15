/**
* Browse teaching requests
*
* @module AvailabilityRequests
* @class controller-home.index
*/
import Controller from '@ember/controller';
import { observer } from '@ember/object';

export default Controller.extend({
  searchText: '',
  loadedOnce: true,
  showFilters: false,

  loadAvailabilities: observer('searchText', function() {
    let q = '%${this.get("searchText")}%';
    let user_id = this.get('session.data.authenticated.user_id');
    let _this = this;
    _this.store.query('availability', {
      'filter[query]': q,
      'filter[user_id]': user_id
    }).then(function(as) {
      as.forEach(function(x) {
        _this.get('model').pushObject(x);
      });
    });
  })
});
