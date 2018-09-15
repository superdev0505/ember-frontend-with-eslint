// import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';
import { belongsTo, hasMany } from 'ember-data/relationships';

// const { attr } = DS;

const Validations = buildValidations({
  firstname: validator('presence', true),
  email: [

    validator('presence', true),
    validator('format', { type: 'email' })
  //  validator('email-available', { debounce: 300 })
  ],

  password: [
    validator('presence', true),
    validator('length', {
      min: 8
    })

  ],

  passwordConfirmation: validator('confirmation', {
    on: 'password',
    message: 'Password do not match'

  })

});

export default Model.extend(Validations, {
  name: attr('string'),
  email: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  bio: attr(),
  confirmed: attr({ readOnly: true }),
  terms: attr(),
  gmc: attr(),

  avatar_url: attr({ readOnly: true }),
  hasAvatar: attr({ readOnly: true }),

  avatar_fullpath: computed('avatar_url', function() {
    let url = this.get('avatar_url');
    url = this.get('apiUrl') + url;
    // if (url.match(/http:/) === null & url.match(/https:/) === null) {
    //   url = this.get('apiUrl') + url;
    // }
    return url;
  }),

  jobTitle: belongsTo('job-title'),
  userLocations: hasMany('user-location'),
  locations: hasMany('location'),
  emailAccounts: hasMany('email-account'),

  // conversations: hasMany('conversation'),
  conversationMembers: hasMany('conversation-member'),

  feedbackRequestsSent: hasMany('feedback-requests', { inverse: 'user' }),
  feedbackRequestsReceived: hasMany('feedback-requests', { inverse: 'target' }),

  /**
  * Determine if the profile is complete
  * i.e. has a job title and a location set
  *
  * @method incompleteProfile
  */
  incompleteProfile: computed('jobTitle', 'userLocations', function() {
    if (this.get('jobTitle.content') === null) {
      return true;
    }
    if (this.get('userLocations.length') === 0) {
      return true;
    }
    return false;
  }),

  /**
  * Determine if the person is a qualified doctor based on their job title
  *
  * @method isQualified
  */
  isQualified: computed('jobTitle', function() {
    let jt = this.get('jobTitle');
    return jt && jt.get('qualified');
  })

});
