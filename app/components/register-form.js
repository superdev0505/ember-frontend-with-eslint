import Component from '@ember/component';
import { inject } from '@ember/service';
export default Component.extend({
  session: inject('session'),
  actions: {
    submit() {
      let user = this.get('user');
      this.triggerSave(user);
    }
  }

});
