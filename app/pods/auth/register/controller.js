import Controller from '@ember/controller';
import { inject  } from '@ember/service';
export default Controller.extend({
  user: null,
  classNames: ['register-form'],

  session: inject('session'),
  actions: {
    save(user) {
      // Check validations client-side
      user.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            // If they pass, save the user
            user.save()
              .then(() => {
                // Log in the newly saved user
                this.get('session').authenticate('authenticator:devise', user.get('email'), user.get('password'))
                  .catch((reason) => {
                    this.set('errorMessage', reason.error || reason);
                  })
                  // Transition to email confirmation route
                  .then(() => {
                    this.transitionToRoute('noaccess.unconfirmed');
                  });
              });
          }
        });
    }
  }
});
