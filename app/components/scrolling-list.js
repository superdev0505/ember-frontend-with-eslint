import Component from '@ember/component';
import { inject } from '@ember/service';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({

  model: A(),

  offset: 0,
  perPage: 10,
  store: inject('store'),

  /**
  * Load more objects into model and increase the offset variable.
  *
  * It is confusing because it uses this, to mean the current component, then uses this again within the el.scroll function to refer to the element being scrolled.
  *
  * @method loadObjects
  */
  loadObjects() {
    let _this = this;
    run(function() {
      _this.set('offset', _this.get('offset') + _this.get('perPage'));

      // Rerun the query used to define the model with the new offset
      let mType = _this.get('model.type.modelName');
      let mQuery = _this.get('model.query');
      mQuery['page[offset]'] = _this.get('offset');

      _this.get('store').query(mType, mQuery).then(function(results) {
        results.forEach(function(x) {
          _this.get('model').pushObject(x._internalModel);
        });
      });
    });

  },

  /**
  * This method calls the loadObjects method when the user scrolls to the bottom of the div.
  *
  * It is confusing because it uses this, to mean the current component, then uses this again within the el.scroll function to refer to the element being scrolled.
  *
  * @method didInsertElement
  */
  didInsertElement() {
    let _this = this;
    let el = this.element.querySelector('.scrolling-list');
    el.scroll(function() {
      if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        _this.loadObjects();
      }
    });
  }
});
