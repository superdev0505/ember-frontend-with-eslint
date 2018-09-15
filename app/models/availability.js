import { computed } from '@ember/object';
import { buildValidations, validator } from 'ember-cp-validations';
const Validations = buildValidations({
  startTime: [
    validator('presence', true),
    validator('ds-error'),
    validator('date', {
      after: 'now'
    })
  ],
  endTime: [
    validator('presence', true),
    validator('ds-error'),
    validator('date', {
      after: 'now'
    })
  ]
});
/**
* The Availabilities module is the core module for creating and editing availabilities.
* It includes setting times and descriptions.
*
* It does not include signing up/inviting people, resources, feedback etc. which are covered in other modules.
*
* @module Availabilities
* @main Availabilities
* @class model-availability
*/
import Alertable from './alertable';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
export default Alertable.extend(Validations, {
  maxStudents: attr('number'),
  startTime: attr('date'),
  endTime: attr('date'),
  specialities: hasMany('specialty'),

  info: attr(),
  locationInfo: attr(),
  aasmState: attr(),
  isPrivate: attr(),
  isPublic: computed('isPrivate', function() {
    return !this.get('isPrivate');
  }),
  completedNotes: attr(),
  createdAt: attr({ readOnly: true }),
  updatedAt: attr({ readOnly: true }),

  user: belongsTo('user'),
  location: belongsTo('location'),

  availabilityUsers: hasMany('availability-user'),
  users: hasMany('user'),
  messages: hasMany('message'),
  jobTitles: hasMany('job-title'),
  // availabilityMessages: hasMany('availability-message'),

  studentCount: computed('availabilityUsers', function() {
    return this.get('availabilityUsers').filter(function(x) {
      return !x.get('teacher') && (x.get('aasmState') === 'confirmed' || x.get('aasmState') === 'interested');
    }).get('length');
  }),

  inviteCount: computed('availabilityUsers', function() {
    return this.get('availabilityUsers').filter(function(x) {
      return !x.get('teacher') && (x.get('aasmState') === 'invited');
    }).get('length');
  }),

  feedbackRequests: hasMany('feedback-request'),
  feedbacks: hasMany('feedback'),

  availabilityItems: hasMany('availability-item', { polymorphic: true }),

  // Calculate the session length in minutes
  duration: computed('startTime', 'endTime', function() {
    return (this.get('endTime') - this.get('startTime')) / 60000;
  })

});
