import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  attrs: {
    confirmed: { serialize: false },
    avatar_url: { serialize: false },
    hasAvatar: { serialize: false }
  }
});
