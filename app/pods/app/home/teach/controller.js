/**
* Availabilities index controller. Handles listing and searching of teaching sessions.
*
* @module Availabilities
* @class controller-app.main.availabilities.index
*/
import Controller from '@ember/controller';
// import { computed } from '@ember/object';
// import { A } from '@ember/array';
// import { on } from '@ember/object/evented';
// import { later } from '@ember/runloop';
// import { inject } from '@ember/service';
// import $ from 'jquery';

export default Controller.extend({

  pageTitle: 'Teaching',
  searchText: '',

  /**
  * Load more availabilities, using offset and limit parameters.
  *
  * @method loadAvailabilities
  */
  init() {
    this._super(...arguments);
    this.loadAvailabilities();
  },
  loadAvailabilities() {
    let _this = this;
    let searchValue = this.get('searchText');
    if (searchValue == '') {
      this.store.findAll('availability').then(function(data) {
        _this.set('model', data);
      });
    } else {
      let data = this.store.peekAll('availability');
      let result = [];
      data.forEach(function(item) {
        if (item.info.indexOf(searchValue) != -1) {
          result.pushObject(item);
        }

        // if (item.info.includes(searchValue) || item.user.name.includes(searchValue)) {
        //   result.pushObject(item);
        // }
      });
      // let result = data.filterBy('info', searchValue);
      _this.set('model', result);
    }
  },

  actions: {
    search() {
      this.loadAvailabilities();
    }
  }
});
