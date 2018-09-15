import Component from '@ember/component';

export default Component.extend({

  termsLink: 'http://www.oslr.co.uk/terms-and-conditions/',

  privacyLink: 'http://www.oslr.co.uk/privacy-policy/',

  isDisabled: true,

  actions: {
    clickToAgree() {
      this.toggleProperty('isDisabled');
    }
  }
});
