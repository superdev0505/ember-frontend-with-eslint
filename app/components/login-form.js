import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  user: null,
  classNames: ['login-form'],
  session: inject('session'),
  actions: {

    authenticate() {
      // let user = this.get('user');
      // user.validate()
      //   .then(({ validations }) => {
      //     if (validations.get('isValid')) {
      //       user.authenticate()
      //
      //         .then(() => this.set('showSaved', true));
      //     }
      //   });

      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:devise', identification, password)
        .catch((reason) => {
          this.set('loginError', reason.error || reason);

        });
    }
  }
});
