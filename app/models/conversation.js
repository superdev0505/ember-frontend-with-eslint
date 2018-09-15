/**
* The Conversation model is analagous to a 'chat' in WhatsApp. It is a collection of messages, associated with conversation-user objects.
*
* @module Messages
* @class model-conversation
*/
import Alertable from './alertable';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Alertable.extend({
  name: attr(),
  createdAt: attr(),
  updatedAt: attr(),

  conversationMembers: hasMany('conversation-member'),
  messages: hasMany('message'),
  availability: belongsTo('availability')

});
