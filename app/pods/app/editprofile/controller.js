import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  newEmail: '',
  responseMessage: '',
  isHidden: true,

  // isValid: match('newEmail', /^.+@.+\..+$/),
  isDisabled: false, // not('isValid'),

  savedEmailAccounts: filterBy('model.emailAccounts', 'primary', false),

  actions: {
    toggleAddEmail() {
      this.toggleProperty('isHidden');
    },

    addEmail() {
      let email = this.get('newEmail');
      let emailAccount = this.get('store').createRecord('emailAccount', {
        user: this.get('model'),
        email
      });
      emailAccount.validate()
        .then(({ validations }) => {
          if (validations.get('isValid')) {
            emailAccount.save().then((ea) => {
              this.set('emailAccount', emailAccount);
              this.set('responseMessage', `The email: ${ea.email} has been saved!`);
              this.set('newEmail', '');
              this.set('isHidden', true);
            });
          } else {
            emailAccount.deleteRecord();
            this.set('responseMessage', `${emailAccount.email} is not a valid email address`);
          }
        }).catch((ea) => {
          emailAccount.deleteRecord();
          let err = ea.errors[0].description;
          this.set('responseMessage', `Sorry but, ${err}`);
        });

      // this.set('emailAccount', emailAccount);

      // emailAccount.save().then((ea) => {
      //   this.set('responseMessage', `The email: ${ea.email} has been saved!`);
      //   this.set('newEmail', '');
      //   this.set('isHidden', true);
      // }).catch((ea) => {
      //   emailAccount.deleteRecord();
      //   let err = ea.errors[0].description;
      //   this.set('responseMessage', `Sorry but, ${err}`);
      // });
    },

    cancel() {
      this.toggleProperty('isHidden');
    }
  }
});
