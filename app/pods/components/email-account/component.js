import Component from '@ember/component';
import { run } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({
  isHidden: true,

  actions: {
    toggleDropdown() {
      this.toggleProperty('isHidden');
    },

    submitConfirmationCode() {
      let _this = this;
      $.ajax({
        url: `${_this.get('apiUrl')}/email_accounts/${_this.get('ea.id')}/submit_confirmation_code`,
        type: 'post',
        data: {
          'confirmation_code': _this.get('enteredCode')
        },
        success() {
          // User successfully confirms their email -> redirect to activities page
          // Need to set confirmed to true to avoid redirect
          // Wrap this in a run loop as it has an action which depends on another server query
          run(function() {
            _this.get('ea').reload();
            _this.set('enteredCode', '');
            _this.set('isHidden', true);
          });
        },
        error(data) {
          // User enters wrong code -> tell them it's wrong
          // alert(data.responseText);
          let error = data.responseText;
          _this.set('errorMessage', error);
          // alert(error);
        },
        beforeSend(xhr) {
          _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
            xhr.setRequestHeader(headerName, headerValue);
          });
        }
      });
    },

    deleteEmailAccount() {
      let emailAccount = this.get('ea');
      if (emailAccount.get('primary')) {
        return false;
      }
      if (confirm('Remove this email address from your account?')) {
        emailAccount.destroyRecord();
      }
    }
  }
});
