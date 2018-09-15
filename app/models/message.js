/**
* Messages module
*
* Handles user to user messaging. Essentially a WhatsApp clone.
*
* The same components are used to send messages within the show availability page - Conversations can be tagged with an availability.
*
* @module Messages
* @main Messages
* @class model-message
*/
import Alertable from './alertable';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Alertable.extend({

  body: attr(),
  createdAt: attr({ readOnly: true }),
  updatedAt: attr({ readOnly: true }),
  // Include the conversation ID for ease of filtering results
  conversationId: attr({ readOnly: true }),
  userId: attr({ readOnly: true }),

  user: belongsTo('user'),
  conversation: belongsTo('conversation'),
  availability: belongsTo('availability')

});
